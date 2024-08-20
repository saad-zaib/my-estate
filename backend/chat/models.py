
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
import uuid
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class ChatSession(models.Model):
    unique_identifier = models.CharField(max_length=255, unique=True)

    class Meta:
        verbose_name_plural = "Chat Sessions"

class ChatMessage(models.Model):
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages', null=True, blank=True)
    sender_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True, related_name='message_sender')
    sender_object_id = models.PositiveIntegerField(null=True, blank=True)
    sender = GenericForeignKey('sender_content_type', 'sender_object_id')
    receiver_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True, related_name='message_receiver')
    receiver_object_id = models.PositiveIntegerField(null=True, blank=True)
    receiver = GenericForeignKey('receiver_content_type', 'receiver_object_id')
    file = models.FileField(upload_to='uploads/', null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Meta:
        ordering = ['date']
        verbose_name_plural = "Messages"