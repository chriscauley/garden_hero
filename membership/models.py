# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.db import models

import datetime, arrow, decimal

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
  months = models.IntegerField(default=1)
  _ht = "If zero, this membership will always be active until deleted."
  amount = models.DecimalField(max_digits=30, decimal_places=2, default=0,help_text=_ht)
  owed = models.DecimalField(max_digits=30, decimal_places=2, default=0)

  _ht = "Only used with PayPal subscriptions. Do not touch."
  subscr_id = models.CharField(max_length=20,null=True,blank=True,help_text=_ht)
  notes = models.TextField(blank=True)
  __str__ = lambda self: "%s @ %s"%(self.user,self.membership)
  last_status = property(lambda self: (self.status_set.all().order_by('-datetime') or [None])[0])
  def save(self,*args,**kwargs):
    self.recalculate(commit=False)
    super(Subscription,self).save(*args,**kwargs)
  def recalculate(self,commit=True):
    now = arrow.get(self.canceled or datetime.datetime.now())
    start_date = arrow.get(self.start_date)
    time_unit = "months"
    for time_span in range(1200): # 100 years
      if start_date.replace(**{ time_unit: time_span }) >= now:
        break
    amount_due = decimal.Decimal(time_span * self.amount / self.months)
    amount_paid = sum([s.amount for s in self.status_set.all()])
    old_owed = self.owed
    old_paid_until = self.paid_until
    self.owed = amount_due-amount_paid
    if self.canceled:
      self.owed = 0
    if self.amount:
      time_paid = int(amount_paid/decimal.Decimal(self.amount))
      self.paid_until = start_date.replace(**{ time_unit: time_paid }).date()
    else:
      self.paid_until = now.replace(days=30).date()
    commit and self.save()
    last = self.last_status
    if self.owed <= 0:
      pass
      #Flag.objects.filter(
      #  subscription=self,
      #  status__in=Flag.PAYMENT_ACTIONS
      #).update(status="paid")

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
  subscription = models.ForeignKey(Subscription)
  transaction_id = models.CharField(max_length=128,null=True,blank=True)
  datetime = models.DateTimeField(default=datetime.datetime.now)
  notes = models.TextField(blank=True)
  __str__ = lambda self: "%s $%s %s"%(self.subscription,self.amount,"paid")

  class Meta:
    verbose_name = "status"
    verbose_name_plural = "statuses"

