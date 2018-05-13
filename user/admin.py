# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from models import User, UserInvite, GardenBuddy

@admin.register(User)
class UserAdmin(UserAdmin):
  fieldsets = list(UserAdmin.fieldsets)
  fieldsets[1] = list(fieldsets[1])
  fieldsets[1][1]['fields'] = ('first_name', 'last_name', 'email', 'phone_number','address1','address2','city','state')
  list_display = ('email','get_full_name','current_plots')

@admin.register(UserInvite)
class UserInviteAdmin(admin.ModelAdmin):
  readonly_fields = ("uuid","accepted")

@admin.register(GardenBuddy)
class GardenBuddyUserAdmin(admin.ModelAdmin):
  list_display = ('email','get_full_name','current_plots', 'primary_user')
  exclude = ('is_garden_buddy',)
