# Generated by Django 4.2.3 on 2024-08-15 10:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('realtors', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='realtor',
            name='email',
        ),
        migrations.RemoveField(
            model_name='realtor',
            name='name',
        ),
        migrations.AlterField(
            model_name='realtor',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='realtor_profile', to=settings.AUTH_USER_MODEL),
        ),
    ]
