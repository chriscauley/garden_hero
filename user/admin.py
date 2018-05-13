# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from models import User, UserInvite, Committee, CommitteeMembership

@admin.register(User)
class UserAdmin(UserAdmin):
  fieldsets = list(UserAdmin.fieldsets)
  fieldsets[1] = list(fieldsets[1])
  fieldsets[1][1]['fields'] = ('first_name', 'last_name', 'email', 'phone_number','address1','address2','city','state')
  list_display = ('email','get_full_name','current_plots')

@admin.register(UserInvite)
class UserInviteAdmin(admin.ModelAdmin):
  readonly_fields = ("uuid","accepted")

@admin.register(Committee)
class CommitteeAdmin(admin.ModelAdmin):
  list_display = ('name', 'seat_limit')

@admin.register(CommitteeMembership)
class CommitteeAdmin(admin.ModelAdmin):
  list_display = ('user', 'chair', 'start_date', 'end_date')
