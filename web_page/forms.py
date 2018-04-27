from django import forms
from to_do_list.models import DueDate, Task


class NameForm(forms.Form):
    your_name = forms.CharField(label='Your name', widget=forms.TextInput(attrs={'style': 'width: 100%;'}))

class ContactForm(forms.Form):
    subject = forms.CharField(widget=forms.TextInput(attrs={'style': 'width: 100%;'}))
    message = forms.CharField(widget=forms.Textarea(attrs={'style': 'width: 100%;'}))
    sender = forms.EmailField(widget = forms.EmailInput(attrs={'style': 'width: 100%;'}))
    cc_myself = forms.BooleanField(required=False)

class DueDateForm(forms.ModelForm):
    due_date = forms.DateTimeField(widget=forms.DateTimeInput(attrs={'style': 'width: 100%;'}))
    class Meta:
        model = DueDate
        fields = ('due_date',)

class TaskForm(forms.ModelForm):
    task_text = forms.CharField(widget=forms.Textarea(attrs={'style': 'width: 100%;'}))
    priority = forms.IntegerField(widget=forms.NumberInput(attrs={'style': 'width: 100%;'}))
    class Meta:
        model = Task
        fields = ('task_text', 'priority',)
    