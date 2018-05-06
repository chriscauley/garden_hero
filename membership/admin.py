# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from models import Membership, Subscription, Status

@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
  pass

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
  readonly_fields = ("owed","subscr_id","canceled")

@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
  pass
