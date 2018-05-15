from django.conf import settings
from django.conf.urls import include, url
from django.views.generic import TemplateView
from django.contrib.auth import urls as auth_urls

import lablackey.urls
import membership.views as membership_views

urlpatterns = [
  url(r'^api/(signup|profile|login)/$',membership_views.user_form_view),
  url(r'^auth/',include(auth_urls)),
  url('^$', TemplateView.as_view(template_name='index.html')),
  url(r'',include(lablackey.urls)),
]
