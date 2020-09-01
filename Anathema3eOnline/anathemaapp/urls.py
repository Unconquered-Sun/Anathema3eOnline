from django.views.decorators.csrf import csrf_exempt
from django.conf.urls import include, url
from django.contrib import admin
from .views import Login, Logout, CreateUser, ShowGenius


urlpatterns = [
	url(r'^$', Login.as_view(), name="Login")
]