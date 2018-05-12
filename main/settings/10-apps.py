INSTALLED_APPS = (
  'main',
  'suit',

  'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.contenttypes',
  'django.contrib.sessions',
  'django.contrib.messages',
  'django.contrib.staticfiles',
  'django.contrib.sites',

  'user',
  'garden',
  'membership',

  'lablackey.api',

  #'drop',
)

AUTH_USER_MODEL = 'user.User'
# Django Suit configuration example
SUIT_CONFIG = {
  # header
  'ADMIN_NAME': 'garden_hero',
  # 'HEADER_DATE_FORMAT': 'l, j. F Y',
  # 'HEADER_TIME_FORMAT': 'H:i',

  # forms
  # 'SHOW_REQUIRED_ASTERISK': True,  # Default True
  # 'CONFIRM_UNSAVED_CHANGES': True, # Default True

  # menu
  # 'SEARCH_URL': '/admin/auth/user/',
  # 'MENU_ICONS': {
  #  'sites': 'icon-leaf',
  #  'auth': 'icon-lock',
  # },
  # 'MENU_OPEN_FIRST_CHILD': True, # Default True
  # 'MENU_EXCLUDE': ('auth.group',),
  # 'MENU': (
  #   'sites',
  #   {'app': 'auth', 'icon':'icon-lock', 'models': ('user', 'group')},
  #   {'label': 'Settings', 'icon':'icon-cog', 'models': ('auth.user', 'auth.group')},
  #   {'label': 'Support', 'icon':'icon-question-sign', 'url': '/support/'},
  # ),

  # misc
  # 'LIST_PER_PAGE': 15
}
