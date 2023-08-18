# Generated by Django 4.2.1 on 2023-08-18 11:34

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0003_rename_profile_agent'),
        ('chat_app', '0003_alter_message_answer_text_alter_message_message_text'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=32)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('addressee_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='addressee', to='user_app.agent')),
                ('owner_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner_id', to='user_app.agent')),
            ],
        ),
        migrations.RemoveField(
            model_name='message',
            name='answer_text',
        ),
        migrations.RemoveField(
            model_name='message',
            name='dialog_id',
        ),
        migrations.AddField(
            model_name='message',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='message',
            name='owner_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='user_app.agent'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Dialog',
        ),
        migrations.AddField(
            model_name='message',
            name='chat_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='chat_app.chat'),
            preserve_default=False,
        ),
    ]
