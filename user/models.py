# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from localflavor.us.models import USStateField

from membership.models import Subscription

import datetime, uuid

class User(AbstractUser):
  _m = "Phone number must be entered in the format: '999999999'. Up to 15 digits allowed."
  phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message=_m)
  phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)
  address1 = models.CharField(max_length=128,blank=True)
  address2 = models.CharField(max_length=128,blank=True)
  city = models.CharField(max_length=64,blank=True)
  state = USStateField(null=True,blank=True)
  parent = models.ForeignKey("self",null=True,blank=True,limit_choices_to={'parent__isnull': True})
  def is_garden_buddy(self):
    return self.parent

  def current_plots(self):
    if self.parent:
      return self.parent.current_plots()
    today = datetime.date.today()
    ums = self.subscription_set.filter(canceled__isnull=True)
    return [u.plot for u in ums]

def get_uuid():
  return uuid.uuid4().hex

class UserInvite(models.Model):
  user = models.ForeignKey(User)
  email = models.EmailField()
  created = models.DateTimeField(auto_now_add=True)
  accepted = models.DateTimeField(null=True,blank=True)
  uuid = models.CharField(max_length=32,default=get_uuid,editable=False)

class Committee(models.Model):
  name = models.CharField(max_length=64)
  seat_limit = models.IntegerField(default=5)

  # TO-DO method to calculate if committee is full

class CommitteeMembership(models.Model):
  user = models.ForeignKey(User)
  committee = models.ForeignKey(Committee)
  chair = models.BooleanField(default=False)
  start_date = models.DateField(default=timezone.now)
  end_date = models.DateField(blank=True)

  # TO-DO method to calculate length
  



