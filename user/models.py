# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

import datetime

class User(AbstractUser):
  _m = "Phone number must be entered in the format: '999999999'. Up to 15 digits allowed."
  phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message=_m)
  phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)
  def current_plots(self):
    today = datetime.date.today()
    ums = self.subscription_set.filter(start_date__gte=today,canceled__isnull=True)
    return [u.plot for u in ums]
