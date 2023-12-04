# Generated by Django 4.2.1 on 2023-11-02 18:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('chat_app', '0010_delete_message'),
        ('agent_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message_text', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('addressee_agent_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='addressee', to='agent_app.agent')),
                ('chat_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat_app.chat')),
                ('owner_agent_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='agent_app.agent')),
                ('request_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='replies', to='message_app.message')),
            ],
        ),
    ]
