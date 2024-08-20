# realtors/serializers.py
from rest_framework import serializers
from .models import Realtor

class RealtorSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = Realtor
        fields = '__all__'
        # Or specify individual fields if you want more control:
        # fields = ['user_name', 'photo', 'description', 'phone', 'top_seller', 'date_hired']

    def get_user_name(self, obj):
        # obj.user is the related User instance
        return obj.user.name if obj.user and obj.user.name else 'No Name'
