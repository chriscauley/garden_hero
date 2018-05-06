# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import jsonfield, datetime

class Garden(models.Model):
  name = models.CharField(max_length=128)
  address = models.CharField(max_length=128)
  city = models.CharField(max_length=64)
  zipcode = models.CharField(max_length=24)
  __str__ = lambda self: self.name

class Plot(models.Model):
  name = models.CharField(max_length=32,blank=True)
  garden = models.ForeignKey(Garden)
  bounds = jsonfield.JSONField(default=[])
  __str__ = lambda self: self.name
  def save(self,*args,**kwargs):
    if not self.name:
      self.name = "#%s"%(Plot.objects.filter(garden=self.garden).count()+1)
    super(Plot,self).save(*args,**kwargs)
  def current_user(self):
    today = datetime.date.today()
    memberships = self.usermembership_set.filter(start_date__lte=today,cancelled__isnull=True)
    if not memberships:
      return None
    if len(membership > 1):
      raise NotImplementedError()
    return memberships[0]
