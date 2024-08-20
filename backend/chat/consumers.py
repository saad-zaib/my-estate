from channels.generic.websocket import AsyncWebsocketConsumer
import json
from asgiref.sync import sync_to_async
from .models import ChatMessage, ChatSession
from django.contrib.contenttypes.models import ContentType
from channels.db import database_sync_to_async
from accounts.models import User
import base64
from django.core.files.base import ContentFile
import logging

logger = logging.getLogger(__name__)

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.session_id = self.scope['url_route']['kwargs']['session_id']
        self.room_group_name = f'chat_{self.session_id}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        logger.info(f'Connected to room: {self.room_group_name}')
        print(f'Connected to room: {self.room_group_name}')

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        logger.info(f'Disconnected from room: {self.room_group_name}')
        print(f'Disconnected from room: {self.room_group_name}')

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_text = text_data_json.get('message')
        session_id = text_data_json.get('session_id')
        sender_id = text_data_json.get('sender', {}).get('id')
        receiver_id = text_data_json.get('receiver', {}).get('id')
        file_data = text_data_json.get('file')

        # Log received data for debugging
        logger.info(f'Received message: {message_text}, file data: {file_data}, session_id: {session_id}')
        # print(f'Received message: {message_text}, file data: {file_data}, session_id: {session_id}')

        session = await database_sync_to_async(self.get_chat_session)(session_id)
        if not session:
            await self.send(text_data=json.dumps({'error': 'Invalid session'}))
            logger.error(f'Invalid session: {session_id}')
            return

        try:
            sender = await database_sync_to_async(User.objects.get)(id=sender_id)
            receiver = await database_sync_to_async(User.objects.get)(id=receiver_id)
        except User.DoesNotExist as e:
            await self.send(text_data=json.dumps({'error': 'User not found'}))
            logger.error(f'User not found: {e}')
            return

        sender_content_type = await database_sync_to_async(ContentType.objects.get_for_model)(sender)
        receiver_content_type = await database_sync_to_async(ContentType.objects.get_for_model)(receiver)
        try:
            if file_data and 'data' in file_data and 'name' in file_data:
                file_info = None
            try:
            # Decode base64 content
                base64_str = file_data['data'].split(',')[1] if ',' in file_data['data'] else file_data['data']
                file_content = base64.b64decode(base64_str)
                file_name = file_data['name']
                file_info = ContentFile(file_content, name=file_name)
                logger.info(f'File decoded successfully: {file_name}')
            except Exception as e:
                logger.error(f'Error decoding file: {e}')
                file_info = None  # Ensure file_info is set to None if decoding fails
        except Exception as e:
            logger.error(f'Unexpected error: {e}')


        try:
            chat_message = await database_sync_to_async(ChatMessage.objects.create)(
                session=session,
                sender_content_type=sender_content_type,
                sender_object_id=sender_id,
                receiver_content_type=receiver_content_type,
                receiver_object_id=receiver_id,
                message=message_text,
                file=file_info
            )
            logger.info(f'Saved message with ID: {chat_message.id}, file: {file_info.name if file_info else None}')
            print(f'Saved message with ID: {chat_message.id}, file: {file_info.name if file_info else None}')
        except Exception as e:
            logger.error(f'Error saving message: {e}')
            return

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message_text,
                'sender': {'id': sender_id},
                'receiver': {'id': receiver_id},
                'file': file_info.name if file_info else None,
                'timestamp': str(chat_message.date)
            }
        )
        logger.info(f'Sent message to room: {self.room_group_name}')

    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']
        receiver = event['receiver']
        file_info = event.get('file')
        timestamp = event['timestamp']

        logger.info(f'Sending message: {message}, file: {file_info}, timestamp: {timestamp}')

        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender,
            'receiver': receiver,
            'file': file_info,  # File name sent to frontend
            'timestamp': timestamp
        }))

    def get_chat_session(self, session_id):
        try:
            return ChatSession.objects.get(unique_identifier=session_id)
        except ChatSession.DoesNotExist:
            return None