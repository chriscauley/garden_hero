# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.db import models

import datetime

class Membership(models.Model):
  garden = models.ForeignKey("garden.Garden")
  name = models.CharField(max_length=128)
  amount = models.DecimalField(decimal_places=2,max_digits=9)
  __str__ = lambda self: self.name

class Subscription(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL)
  membership = models.ForeignKey(Membership)
  plot = models.ForeignKey("garden.Plot")
  start_date = models.DateField(default=datetime.date.today)
  canceled = models.DateField(null=True,blank=True)
  paid_until = models.DateTimeField(null=True,blank=True)
  _ht = "If zero, this membership will always be active until deleted."
  amount = models.DecimalField(max_digits=30, decimal_places=2, default=0,help_text=_ht)
  owed = models.DecimalField(max_digits=30, decimal_places=2, default=0)

  _ht = "Only used with PayPal subscriptions. Do not touch."
  subscr_id = models.CharField(max_length=20,null=True,blank=True,help_text=_ht)
  __str__ = lambda self: "%s @ %s"%(self.user,self.membership)

PAYMENT_METHOD_CHOICES = (
  ('paypal','PayPalIPN'),
  ('cash', 'Cash/Check'),
  ('adjustment', 'Adjustment (gift from garden)'),
  ('refund', 'Refund'),
  ('legacy','Legacy'),
)

class Status(models.Model):
  amount = models.DecimalField(decimal_places=2,max_digits=9)
  payment_method = models.CharField(max_length=32,choices=PAYMENT_METHOD_CHOICES)
  transaction_id = models.CharField(max_length=128,null=True,blank=True)
  datetime = models.DateTimeField(default=datetime.datetime.now)
  notes = models.TextField(blank=True)
  __str__ = lambda self: "%s $%s"%(self.usermembership,self.amount)
