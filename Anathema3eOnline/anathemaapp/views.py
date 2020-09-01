from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.views.generic import View

# Create your views here.
class Login(View):
	def get(self, request):
		print("Login Get")
		