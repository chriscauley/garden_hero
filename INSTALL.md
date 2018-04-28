# Installation Instructions

```
virtualenv .e # or whatever you want for a virtualenvironment

source .e/bin/activate # you'll do this everytime you need to run manage.py

pip install -r requirements.txt

python manage.py migrate

python manage.py createsuperuser # follow the prompts
```
