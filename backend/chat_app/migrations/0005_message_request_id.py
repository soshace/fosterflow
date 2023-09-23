# Generated by Django 4.2.1 on 2023-09-22 14:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat_app', '0004_chat_remove_message_answer_text_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='request_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='replies', to='chat_app.message'),
        ),
    ]
