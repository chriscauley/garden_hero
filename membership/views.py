# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from django.http import JsonResponse
from django.template.response import TemplateResponse
from .forms import ProfileForm, RegistrationForm

FORMS = {
  'profile': ProfileForm,
  'signup': RegistrationForm,
}

def user_form_view(request,slug):
  if slug == "login":
    form = AuthenticationForm(request,request.POST or None)
  else:
    form = FORMS[slug](request)

  if form.is_valid():
    if slug == "login":
      user = form.get_user()
    else:
      user = form.save()
    if not request.user.is_authenticated():
      login(request, user)
    return JsonResponse({ f: getattr(user,f) for f in ['id','email'] })
  # uncomment to make the form render as an html form
  # if request.method == "GET":
  #   return TemplateResponse(request,"form.html",{'form': form})
  return JsonResponse({ 'errors': { k: e.get_json_data()[0]['message'] for k,e in form.errors.items() } or None})
