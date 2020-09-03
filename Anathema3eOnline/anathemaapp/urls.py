from django.views.decorators.csrf import csrf_exempt
from django.conf.urls import include, url
from django.contrib import admin
from .views import Login, CreateUser, Anathema


urlpatterns = [
	url('login/', Login.as_view() , name="Login"),
	url('createuser/', CreateUser.as_view() , name="CreateUser"),
	url('anathema/', Anathema.as_view() , name="Anathema"),
	url('', Login.as_view() , name="Login")
]