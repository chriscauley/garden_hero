# Installation Instructions

Before starting you'll need to install git, pip, and sqlite3. Instructions for this vary from platform to platform, so I'm not going to even try do describe them here.

```
sudo easy_install pip # if pip not already installed

git clone https://github.com/chriscauley/garden_hero.git

sudo pip install virtualenv # if not already installed

virtualenv .e # or whatever you want for a virtualenvironment

source .e/bin/activate # you'll do this everytime you need to run manage.py

pip install -r requirements.txt

python manage.py shell
```

If everything is working properly you should see a python prompt. Exit with `ctrl+d` and get a dummy copy of the database from me and copy it to `main/db.sqlite3`. You can now start the server with:

`python manage.py runserver`

# Running Client Application

Be sure you have the altest version of `Node` installed (`npm` comes with Node):
https://nodejs.org/en/download/

- Navigate into the project directory in the command line.
- Run `npm install`.
- Run `npm start` to run the Dev Server.