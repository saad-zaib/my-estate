# realtors/models.py
from django.db import models
from datetime import datetime
from accounts.models import User  # Import User from the correct app

class Realtor(models.Model):
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, related_name="realtor_profile")
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/')
    description = models.TextField(blank=True)
    phone = models.CharField(max_length=225)
    top_seller = models.BooleanField(default=False)
    date_hired = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.user.name if self.user else 'No Name'
