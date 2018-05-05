# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from models import Plot, Garden

@admin.register(Garden)
class GardenAdmin(admin.ModelAdmin):
  pass

@admin.register(Plot)
class PlotAdmin(admin.ModelAdmin):
  pass
