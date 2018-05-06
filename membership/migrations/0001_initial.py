# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-05-01 21:16
from __future__ import unicode_literals

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('garden', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Membership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=9)),
                ('garden', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='garden.Garden')),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=9)),
                ('payment_method', models.CharField(choices=[('paypal', 'PayPalIPN'), ('cash', 'Cash/Check'), ('adjustment', 'Adjustment (gift from garden)'), ('refund', 'Refund'), ('legacy', 'Legacy')], max_length=32)),
                ('transaction_id', models.CharField(blank=True, max_length=128, null=True)),
                ('datetime', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
        migrations.CreateModel(
            name='UserMembership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField(default=datetime.date.today)),
                ('canceled', models.DateField(blank=True, null=True)),
                ('membership', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='membership.Membership')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='payment',
            name='usermembership',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='membership.UserMembership'),
        ),
    ]