# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import jsonfield

class Garden(models.Model):
  name = models.CharField(max_length=128)
  address = models.CharField(max_length=128)
  city = models.CharField(max_length=64)
  zipcode = models.CharField(max_length=24)
  __str__ = lambda self: self.name

class Plot(models.Model):
  display_name = models.CharField(max_length=32)
  garden = models.ForeignKey(Garden)
  bounds = jsonfield.JSONField(default=[])
  membership = models.ForeignKey('membership.Membership')
  __str__ = lambda self: self.display_name
