from django import forms
from to_do_list.models import DueDate, Task

class NameForm(forms.Form):
    your_name = forms.CharField(label='Your name', max_length=100)

class ContactForm(forms.Form):
    subject = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea)
    sender = forms.EmailField()
    cc_myself = forms.BooleanField(required=False)

class DueDateForm(forms.ModelForm):
    class Meta:
        model = DueDate
        fields = ('due_date',)

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ('task_text', 'priority',)