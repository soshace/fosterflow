import random
import string

from django.db import migrations
from agent_app.models import Agent
from nlp_models_app.models import NlpModel


def create_Gpt35Turbo4K(apps, schema_editor):
    nml_model = NlpModel.objects.create(title='GPT-3.5-turbo-4k')
    nml_model.save()
    agent = Agent.objects.create(name='GPT-3.5-turbo-4k', nlp_model=nml_model)
    agent.save()


def create_Gpt35Turbo16K(apps, schema_editor):
    nml_model = NlpModel.objects.create(title='GPT-3.5-turbo-16k')
    nml_model.save()
    agent = Agent.objects.create(name='GPT-3.5-turbo-16k', nlp_model=nml_model)
    agent.save()


def create_Gpt48K(apps, schema_editor):
    nml_model = NlpModel.objects.create(title='GPT-4-8k')
    nml_model.save()
    agent = Agent.objects.create(name='GPT-4-8k', nlp_model=nml_model)
    agent.save()


def create_Gpt432K(apps, schema_editor):
    nml_model = NlpModel.objects.create(title='GPT-4-32k')
    nml_model.save()
    agent = Agent.objects.create(name='GPT-4-32k', nlp_model=nml_model)
    agent.save()


class Migration(migrations.Migration):
    dependencies = [
        ('chat_app', '0008_alter_chat_addressee_id_alter_chat_owner_id_and_more'),
    ]

    operations = [
        migrations.RunPython(create_Gpt35Turbo4K),
        migrations.RunPython(create_Gpt35Turbo16K),
        migrations.RunPython(create_Gpt48K),
        migrations.RunPython(create_Gpt432K),
    ]
