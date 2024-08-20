# views.py
from listing.models import RentListing
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Comment,Like
from .serailizers import CommentSerializer,LikeSerializer 

@api_view(['POST'])
@permission_classes([AllowAny])
def create_comment(request):
    user = request.user

    try:
        document_data = request.data.get('shared_document', {})
        document_title = document_data.get('title', '')
        comment_text = request.data.get('text', '')

        if not document_title:
            return Response({'error': 'Title not provided for shared_document.'}, status=status.HTTP_400_BAD_REQUEST)

        shared_documents = RentListing.objects.filter(title=document_title)

        if not shared_documents.exists():
            return Response({'error': 'RentListing not found.'}, status=status.HTTP_404_NOT_FOUND)

        shared_document = shared_documents.first()

        comment = Comment.objects.create(user=user, social_comment=shared_document, text=comment_text)

        serializer = CommentSerializer(comment)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_like(request):
    user = request.user

    try:
        document_data = request.data.get('shared_document', {})
        document_title = document_data.get('title', '')

        if not document_title:
            return Response({'error': 'Title not provided for shared_document.'}, status=status.HTTP_400_BAD_REQUEST)

        shared_documents = RentListing.objects.filter(title=document_title)

        if not shared_documents.exists():
            return Response({'error': 'RentListing not found.'}, status=status.HTTP_404_NOT_FOUND)

        shared_document = shared_documents.first()

        # Ensure that a user can only like a document once
        like, created = Like.objects.get_or_create(user=user, rent_listing=shared_document)

        if not created:
            return Response({'error': 'You have already liked this listing.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = LikeSerializer(like)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
