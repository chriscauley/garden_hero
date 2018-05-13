from django import forms

from lablackey.forms import RequestModelForm,RequestForm

from user.models import User, UserInvite

class SigninForm(RequestForm):
  username = forms.CharField(max_length=64)
  password = forms.CharField(max_length=64)
  @classmethod
  def user_is_allowed(cls,request):
    return True
  class Meta:
    widgets = { 'password': forms.PasswordInput(), }

class ProfileForm(RequestModelForm):
  @classmethod
  def user_is_allowed(cls,request):
    #! TODO!!
    return True
  class Meta:
    model = User
    fields = ("email","first_name","last_name","phone_number","address1","address2","city","state",)

class RegistrationForm(RequestModelForm):
  uuid = forms.CharField(required=False,widget=forms.HiddenInput(),max_length=32)
  @classmethod
  def user_is_allowed(cls,request):
    #! TODO!!
    return True
  def __init__(self,request,*args,**kwargs):
    kwargs['initial'] = kwargs.get("initial",None) or {}
    state = "PA"
    city = "Philadelphia"
    data = getattr(request,request.method)
    try:
      self.invite = UserInvite.objects.get(uuid=data.get("uuid",""))
      kwargs['initial'].update(
        email = self.invite.email,
        uuid = self.invite.uuid
      )
    except UserInvite.DoesNotExist:
      self.invite = None
    super(RegistrationForm,self).__init__(request,*args,**kwargs)
    for field in ['email','first_name','last_name','phone_number','address1','city','state']:
      self.fields[field].required = True
  class Meta:
    model = User
    fields = ("email","password","first_name","last_name","phone_number","address1","address2","city","state","uuid")
    widgets = { 'password': forms.PasswordInput(), }
