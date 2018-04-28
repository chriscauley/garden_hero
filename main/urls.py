from django.conf import settings
from django.conf.urls import include, url

from django.contrib.auth import urls as auth_urls

import lablackey.urls

urlpatterns = [
  url(r'^auth/',include(auth_urls)),
  url(r'',include(lablackey.urls)),
]
