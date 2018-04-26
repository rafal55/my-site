from django.contrib import admin
from .models import DueDate, Task

# Register your models here.
class TaskInline(admin.StackedInline):
    model = Task
    extra = 3

class DueDateAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,    {'fields':['due_date',]}),
        ('Tasks', {'fields':['task_text',],'classes':['collapse']}),
    ]
    inlines = [TaskInline]

admin.site.register(DueDate, DueDateAdmin)
