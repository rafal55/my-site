from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from to_do_list.models import DueDate, Task
from .forms import NameForm, ContactForm, DueDateForm, TaskForm

def start_page(request):
    return render(request, 'start_page.html')

def home_page(request):
    form = NameForm()
    contact = ContactForm()
    duedate = DueDateForm()
    task = TaskForm()
    return render(request, 'home_page.html', {'form': form,'contact': contact,'duedate': duedate, 'task':task,})

def your_name(request):
    contact = ContactForm()
    if request.method == 'POST':
        form = NameForm(request.POST)
        if form.is_valid():
            # process the data in form.cleaned_data as required
            data =  form.cleaned_data['your_name']
            form = NameForm()
            # redirect to a new URL:
            return render(request, 'home_page.html', {'form': form,'contact': contact,'data': data})
    else:    
        return render(request, 'home_page.html', {'form': form,'contact': contact})

def contact(request):
    form = NameForm()
    if request.method == 'POST':
        contact = ContactForm(request.POST)
        if contact.is_valid():
            subject = contact.cleaned_data['subject']
            message = contact.cleaned_data['message']
            sender = contact.cleaned_data['sender']
            cc_myself = contact.cleaned_data['cc_myself']

            recipients = ['info@example.com']
        if cc_myself:
            recipients.append(sender)
        return render(request, 'home_page.html', {'form': form,'contact': contact,'subject': subject})
    else:    
        return render(request, 'home_page.html', {'form': form,'contact': contact})

def to_do_list(request):
    form = NameForm()
    duedate= DueDateForm()
    if request.method == 'POST':
        duedate = DueDateForm(request.POST)
        if duedate.is_valid():
            duedate = duedate.cleaned_data

        return render(request, 'home_page.html', {'form': form,'contact': contact,'duedate':duedate})
    else:    
        return render(request, 'home_page.html', {'form': form,'contact': contact,'duedate':duedate})

def race_car(request):
    return render(request, 'race_car.html')

def slider(request):
    return render(request, 'slider.html')