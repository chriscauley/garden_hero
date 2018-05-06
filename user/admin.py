# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from models import User

@admin.register(User)
class UserAdmin(UserAdmin):
  fieldsets = list(UserAdmin.fieldsets)
  fieldsets[1] = list(fieldsets[1])
  fieldsets[1][1]['fields'] = ('first_name', 'last_name', 'email', 'phone_number')
  list_display = ('email','get_full_name','current_plots')
