# Generated by Django 4.2.1 on 2023-11-22 15:25

from django.db import migrations, models
import django.db.models.deletion
import user_agent_profile_app.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('agent_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAgentProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, verbose_name='ID')),
                ('user_agent', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='agent_app.agent')),
                ('avatar', models.ImageField(blank=True, upload_to=user_agent_profile_app.models.get_image_filename)),
                ('first_name', models.TextField(max_length=32)),
                ('last_name', models.TextField(max_length=32)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
