# realtors/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import User
from .models import Realtor

@receiver(post_save, sender=User)
def create_or_update_realtor(sender, instance, created, **kwargs):
    if instance.is_realtor:
        if created:
            Realtor.objects.create(user=instance)
        else:
            # If the user is updated and is_realtor remains True, ensure the related Realtor instance exists
            Realtor.objects.get_or_create(user=instance)
    else:
        # If the user is not a realtor, ensure no related Realtor instance exists
        Realtor.objects.filter(user=instance).delete()
