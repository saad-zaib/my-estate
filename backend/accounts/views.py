from rest_framework.response import Response
from rest_framework import status
from .models import User
from rest_framework.views import APIView
from .serializers import SendPasswordResetEmailSerializer,UserListSerializer, UserChangePasswordSerializer, UserLoginSerializer, UserPasswordResetSerializer, UserProfileSerializer, UserRegistrationSerializer
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from rest_framework.generics import ListAPIView
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import render
from rest_framework.parsers import MultiPartParser, FormParser
import base64
import uuid
from django.core.files.base import ContentFile
from django.http import FileResponse, Http404
import os


# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

class UserRegistrationView(APIView):
  permission_classes = [AllowAny]  # Allow any user, authenticated or not
  renderer_classes = [UserRenderer]
  parser_classes = [MultiPartParser, FormParser]

  def post(self, request, format=None):
    data = self.request.data
    serializer = UserRegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    print(request.data)
    return Response({'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)
  
class EmailConfirmationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        
        if user is not None and default_token_generator.check_token(user, token):
            if user.is_active:
                # Handle the case when the user is already active (already confirmed)
                return render(request, 'already_confirm.html')
            else:
                user.is_active = True
                user.save()
                return render(request, 'confirmation_success.html')
                # Replace "YOUR_REDIRECT_URL_AFTER_CONFIRMATION" with the URL where you want to redirect the user after successful email confirmation.
        else:
            # Handle invalid token or user not found cases
            return render(request,'invalid.html')
        

class UserLoginView(APIView):
  permission_classes = [AllowAny]
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
            if user.is_active:
                token = get_tokens_for_user(user)
                return Response({'token': token, 'msg': 'Login Success'}, status=status.HTTP_200_OK)
            else:
                return Response({'errors': {'non_field_errors': ['Email is not confirmed yet. Please check your email for the confirmation link.']}},
                                status=status.HTTP_403_FORBIDDEN)
    else:
      return Response({'errors':{'non_field_errors':['Email is not confirmed or credentials are invalid ']}}, status=status.HTTP_404_NOT_FOUND)

class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = []
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserUploadImage(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        user = request.user

        if not user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)

        if 'user_image' in request.data:
            user_image_base64 = request.data['user_image']  # Get the base64 encoded image

            try:
                # Decode the base64 image data
                format, imgstr = user_image_base64.split(';base64,') 
                ext = format.split('/')[-1]  # Extract the file extension from the format

                # Create a unique filename with the .jpg extension
                file_name = f"{uuid.uuid4()}.jpg"

                # Convert the base64 string to binary data
                img_data = base64.b64decode(imgstr)

                # Create a Django ContentFile instance from the decoded data
                file = ContentFile(img_data, name=file_name)

                # Save the file to the user's image field directly
                user.user_image.save(file_name, file)
                
                # Save the user instance to ensure the image is saved in the database
                user.save()
                
                return Response({"detail": "Image uploaded successfully."}, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({"detail": f"Error saving image: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "No image data provided."}, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request, format=None):
        user = request.user

        if not user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)

        if user.user_image:
            # Get the file path from the file field
            file_path = user.user_image.path
            
            if os.path.exists(file_path):
                # Serve the file directly
                return FileResponse(open(file_path, 'rb'), content_type='image/jpeg')
            else:
                raise Http404("Image not found.")
        else:
            return Response({"detail": "No image found for this user."}, status=status.HTTP_404_NOT_FOUND)
    
class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)

class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)


class UserListView(ListAPIView):
    # user will be authenticated in account views so don't need to authenticate again
    permission_classes =(permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserListSerializer
