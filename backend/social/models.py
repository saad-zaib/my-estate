# comments/models.py
from django.db import models
from listing.models import RentListing
from accounts.models import User

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    social_comment = models.ForeignKey(RentListing, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.email} on  {self.social_comment.title}"
    def __str__(self):
        return f"Like by {self.user.email} on {self.social_comment.title}"

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    social_like = models.ForeignKey(RentListing, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'social_like')

    def __str__(self):
        return f"Like by {self.user.email} on {self.social_like.title}"
