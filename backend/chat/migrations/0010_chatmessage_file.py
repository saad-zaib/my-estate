# Generated by Django 4.2.3 on 2024-08-10 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0009_remove_chatmessage_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatmessage',
            name='file',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
