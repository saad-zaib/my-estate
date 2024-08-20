
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ChatMessage, ChatSession
from .serializers import ChatMessageSerializer
from accounts.models import User
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.exceptions import APIException
from django.contrib.contenttypes.models import ContentType
import uuid
from django.db.models import Q
import logging




logger = logging.getLogger(__name__)

class CreateChatSessionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        sender_id = request.data.get('sender_id')
        receiver_id = request.data.get('receiver_id')

        if not sender_id or not receiver_id:
            return Response({'error': 'Missing sender_id or receiver_id'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            sender = User.objects.get(id=sender_id)
            receiver = User.objects.get(id=receiver_id)
        except User.DoesNotExist:
            return Response({'error': 'Sender or receiver does not exist'}, status=status.HTTP_404_NOT_FOUND)

        sender_content_type = ContentType.objects.get_for_model(sender)
        receiver_content_type = ContentType.objects.get_for_model(receiver)

        # Find existing session or create a new one
        session = ChatSession.objects.filter(
            Q(messages__sender_content_type=sender_content_type, messages__sender_object_id=sender.id, 
              messages__receiver_content_type=receiver_content_type, messages__receiver_object_id=receiver.id) |
            Q(messages__sender_content_type=receiver_content_type, messages__sender_object_id=receiver.id, 
              messages__receiver_content_type=sender_content_type, messages__receiver_object_id=sender.id)
        ).distinct().first()

        if not session:
            session = ChatSession.objects.create(
                unique_identifier=str(uuid.uuid4())
            )

        return Response({'session_id': session.unique_identifier}, status=status.HTTP_200_OK)
class ChatMessageListView(generics.ListCreateAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        session_id = self.request.query_params.get('session_id')

        if not session_id:
            raise APIException("Session ID is required")

        try:
            session = ChatSession.objects.get(unique_identifier=session_id)
        except ChatSession.DoesNotExist:
            raise Http404("Session not found")
        except Exception as e:
            logger.error(f"Error occurred: {e}")
            raise APIException("An unexpected error occurred")

        return session.messages.all()

    def perform_create(self, serializer):
        session_id = self.request.data.get('session_id')
        session = ChatSession.objects.get(unique_identifier=session_id)
        sender_id = self.request.user.id
        receiver = session.messages.first().receiver  # Assume there's always at least one message for simplicity

        if sender_id not in [session.messages.first().sender_object_id, receiver.id]:
            raise APIException("Unauthorized to send messages in this session")

        serializer.save(
            session=session,
            sender_content_type=ContentType.objects.get_for_model(self.request.user),
            sender_object_id=self.request.user.id,
            receiver_content_type=ContentType.objects.get_for_model(receiver),
            receiver_object_id=receiver.id
        )
