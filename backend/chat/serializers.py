from rest_framework import serializers
from accounts.models import User
from .models import ChatMessage



class ChatMessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    receiver = serializers.SerializerMethodField()

    class Meta:
        model = ChatMessage
        fields = ['message', 'sender', 'receiver', 'file', 'date']

    def get_sender(self, obj):
        return {'id': obj.sender_object_id, 'username': str(obj.sender)}

    def get_receiver(self, obj):
        return {'id': obj.receiver_object_id, 'username': str(obj.receiver)}