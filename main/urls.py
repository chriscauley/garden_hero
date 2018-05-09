from django.conf import settings
from django.conf.urls import include, url
from django.views.generic import TemplateView
from django.contrib.auth import urls as auth_urls

import lablackey.urls

urlpatterns = [
  url(r'^auth/',include(auth_urls)),
  url('^$', TemplateView.as_view(template_name='base.html')),
  url(r'',include(lablackey.urls)),
]
