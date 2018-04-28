# Settings loader file.

import os, sys, glob, re, socket

pwd = os.path.dirname(__file__)
sys.path.append(os.path.join(pwd,'..'))
sys.path.append(os.path.join(pwd,'../../.dev/'))

# Open and compile each file
machine_name = re.sub('[^A-z0-9._]', '_', socket.gethostname())
for s_file in ['00-base','10-apps','local',machine_name]:
  try:
    f = 'main/settings/%s.py'%s_file
    exec(compile(open(os.path.abspath(f)).read(), f, 'exec'), globals(), locals())
  except IOError:
    print "Setting file missing. We looked here: %s"%f
