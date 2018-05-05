# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from models import Membership, UserMembership, Payment

@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
  pass

@admin.register(UserMembership)
class UserMembershipAdmin(admin.ModelAdmin):
  pass

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
  pass
