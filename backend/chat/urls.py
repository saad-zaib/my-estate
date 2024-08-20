# chat/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('create-session/', views.CreateChatSessionView.as_view(), name='create_chat_session'),
    path('messages/', views.ChatMessageListView.as_view(), name='chat-message-list'),
]
