import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

SECRET_KEY = '8d&j_3zjc^4!)+3_s0!waya72jhx8j=3iryhexz=uq)9t)vbcs'

ALLOWED_HOSTS = ["*"]

MIDDLEWARE_CLASSES = [
  'django.contrib.sessions.middleware.SessionMiddleware',
  'django.middleware.common.CommonMiddleware',
  'django.middleware.csrf.CsrfViewMiddleware',
  'django.contrib.auth.middleware.AuthenticationMiddleware',
  'django.contrib.messages.middleware.MessageMiddleware',
  'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

TEMPLATES = [
  { 
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [
        os.path.join(BASE_DIR, '..', 'build')
    ],
    'APP_DIRS': True,
    'OPTIONS': {
      'context_processors': [
        'django.template.context_processors.debug',
        'django.template.context_processors.request',
        'django.template.context_processors.media',
        'django.template.context_processors.static',
        'django.contrib.auth.context_processors.auth',
        'django.template.context_processors.request',
        'django.template.context_processors.tz',
        'django.contrib.messages.context_processors.messages',
        #'social.apps.django_app.context_processors.backends',
        #'social.apps.django_app.context_processors.login_redirect',
      ],
    },
  },
]

AUTHENTICATION_BACKENDS = (
  #'social.backends.google.GoogleOAuth2',
  #'social.backends.twitter.TwitterOAuth',
  'lablackey.auth.EmailOrUsernameModelBackend',
  'django.contrib.auth.backends.ModelBackend',
)

# Above comments are useful for social auth. Requires these keys in a private file
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = ""
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = ""

SOCIAL_AUTH_TWITTER_SECRET = ""
SOCIAL_AUTH_TWITTER_KEY = ""

ROOT_URLCONF = 'main.urls'

WSGI_APPLICATION = 'main.wsgi.application'

DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
  }
}

# DATABASES = {
#   'default': {
#     'ENGINE': 'django.db.backends.postgresql_psycopg2',
#     'NAME': 'garden_hero',
#     'USER': 'postgres',
#     'PASSWORD': 'postgres',
#   },
# }

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = USE_L10N = USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, '../.static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, '../.media')
LOGIN_URL = '/auth/login/'
LOGIN_REDIRECT_URL = "/"

STATICFILES_FINDERS = (
  'django.contrib.staticfiles.finders.FileSystemFinder',
  'django.contrib.staticfiles.finders.AppDirectoriesFinder',
  # other finders..
  'compressor.finders.CompressorFinder',
)

STATICFILES_DIRS = [
  os.path.join(BASE_DIR, '..', 'build/static'),
]

LESS_EXECUTABLE = 'lessc'
COMPRESS_PRECOMPILERS = [
  ('text/less', "lessc {infile} {outfile} --line-numbers=comments;autoprefixer-cli {outfile} -o {outfile}"),
]

FAVICON = '/static/devicon.ico'

DEBUG = THUMBNAIL_DEBUG = True

COMPRESS_ENABLED = COMPRESS_OFFLINE = False
