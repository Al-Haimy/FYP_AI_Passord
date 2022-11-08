from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Pattern(models.Model):
    id = models.AutoField(primary_key=True)
    userId = models.ForeignKey(User,on_delete=models.CASCADE)
    pattern_count = models.IntegerField()

    class Meta:
        verbose_name_plural = "Patterns"