DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if 'cat /tmp/garden_hero_uwsgi.pid && kill -HUP `cat /tmp/garden_hero_uwsgi.pid`)'
then
    echo "uwsgi reset"
else
    # this may need to be updatede for django 1.7
    /usr/bin/uwsgi-core -M -x $DIR/../uwsgi.xml --plugin python&&
    echo "uwsgi wasn't running, but it is now!"
fi

exit 0
