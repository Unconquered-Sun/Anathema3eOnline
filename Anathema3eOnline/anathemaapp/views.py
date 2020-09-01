from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.generic import View

# Create your views here.
class Login(View):
	def get(self, request):
		print("Login Get")
		if "id" in request.session:
			if request.session["id"] != None:
				user = User.objects.get(id=request.session["id"])
				print(request.session["id"])
				return render(request, "anathemaapp/home.html")
		return render(request, "anathemaapp/login.html",{'forms':AuthenticationForm()})

	def post(self, request):
		username = request.POST['username']
		password = request.POST['password']
		user = authenticate(username=username, password=password)
		if user:
			if user.is_active:
				request.session["id"]= user.id
				return render(request, "anathemaapp/home.html", {"user":user.id})
		print("Test")
		return render(request, "anathemaapp/login.html",{'forms':AuthenticationForm(request.POST)})


class CreateUser(View):
	def get(self, request):
		print("CreateUser Get")
		return render(request, "anathemaapp/createuser.html", {"forms": UserCreationForm() })

	def post(self, request):	
		tempform = UserCreationForm(request.POST)
		print(tempform)
		if tempform.is_valid():
			print("PING")
			user = tempform.save()
			request.session["id"]= user.id
			return render(request, "anathemaapp/home.html", {'user':user.id})
		else:
			return render(request, "anathemaapp/createuser.html", {"forms": UserCreationForm(request.POST) })