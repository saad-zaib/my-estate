from django.contrib import admin
from .models import ChatSession, ChatMessage
from django.utils.html import format_html
from django.urls import NoReverseMatch
# admin.py
from django.contrib import admin
from .models import ChatSession, ChatMessage

class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ('unique_identifier',)
    search_fields = ('unique_identifier',)
    readonly_fields = ('unique_identifier',)  # Make unique_identifier read-only

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return self.readonly_fields + ('unique_identifier',)
        return self.readonly_fields

class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('session', 'sender_display', 'receiver_display', 'message', 'date', 'file_display')
    search_fields = ('session__unique_identifier', 'file', 'message', 'sender__username', 'receiver__username')
    readonly_fields = ('date',)

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return self.readonly_fields + ('date',)
        return self.readonly_fields

    def sender_display(self, obj):
        return f"{obj.sender} (ID: {obj.sender_object_id})"

    def receiver_display(self, obj):
        return f"{obj.receiver} (ID: {obj.receiver_object_id})"

    def file_display(self, obj):
        if obj.file:
            return format_html('<img src="{}" style="max-height: 100px;"/>', obj.file.url)
        return 'No Image'

admin.site.register(ChatSession, ChatSessionAdmin)
admin.site.register(ChatMessage, ChatMessageAdmin)
