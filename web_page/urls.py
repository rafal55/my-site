from django.urls import path

from . import views

urlpatterns = [
    path('start_page', views.start_page, name='start_page'),
    path('home_page', views.home_page, name='home_page'),
    path('your_name', views.your_name, name='home_page'),
    path('contact', views.contact, name='home_page'),
    path('to_do_list', views.to_do_list, name='home_page'),

]
