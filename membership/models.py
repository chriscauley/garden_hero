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

class UserMembership(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL)
  membership = models.ForeignKey(Membership)
  start_date = models.DateField(default=datetime.date.today)
  canceled = models.DateField(null=True,blank=True)
  __str__ = lambda self: "%s @ %s"%(self.user,self.membership)

PAYMENT_METHOD_CHOICES = (
  ('paypal','PayPalIPN'),
  ('cash', 'Cash/Check'),
  ('adjustment', 'Adjustment (gift from garden)'),
  ('refund', 'Refund'),
  ('legacy','Legacy'),
)

class Payment(models.Model):
  usermembership = models.ForeignKey(UserMembership)
  amount = models.DecimalField(decimal_places=2,max_digits=9)
  payment_method = models.CharField(max_length=32,choices=PAYMENT_METHOD_CHOICES)
  transaction_id = models.CharField(max_length=128,null=True,blank=True)
  datetime = models.DateTimeField(default=datetime.datetime.now)
  __str__ = lambda self: "%s $%s"%(self.usermembership,self.amount)
