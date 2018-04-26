from django.db import models
from django.forms import ModelForm

# Create your models here.
class DueDate(models.Model):
    due_date = models.DateTimeField('Task due date')

    def __str__(self):
        return str(self.due_date)

class Task(models.Model):
    due_date = models.ForeignKey(DueDate, on_delete = models.CASCADE)
    task_text = models.TextField()
    priority = models.IntegerField(default=1)

    def __str__(self):
        return self.task_text

