# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-05-13 04:57
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_auto_20180513_0432'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommitteeMembership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chair', models.BooleanField(default=False)),
                ('start_date', models.DateField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.RemoveField(
            model_name='committee',
            name='chair',
        ),
        migrations.RemoveField(
            model_name='committee',
            name='members',
        ),
        migrations.AddField(
            model_name='committeemembership',
            name='committee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.Committee'),
        ),
        migrations.AddField(
            model_name='committeemembership',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
