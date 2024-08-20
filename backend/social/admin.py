from django.contrib import admin
from .models import Comment, Like
from django.http import HttpResponseRedirect

class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'social_comment_title', 'text', 'created_at')

    def social_comment_title(self, obj):
        return obj.social_comment.title if obj.social_comment else 'No Title'
    social_comment_title.admin_order_field = 'social_comment'  # Allows column sorting by this field
    social_comment_title.short_description = 'Social Comment Title'

    def response_change(self, request, obj):
        self.message_user(request, f'The comment on "{obj.social_comment.title if obj.social_comment else "Unknown"}" was changed successfully.', level='success')
        return HttpResponseRedirect(request.path_info)
    
    def response_add(self, request, obj):
        self.message_user(request, f'The comment on "{obj.social_comment.title if obj.social_comment else "Unknown"}" was added successfully.', level='success')
        return HttpResponseRedirect(request.path_info)

admin.site.register(Comment, CommentAdmin)

class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'like_rent_listing', 'created_at')

    def like_rent_listing(self, obj):
        return obj.social_like.title if obj.social_like else 'No Title'
    like_rent_listing.admin_order_field = 'rent_listing'  # Allows column sorting by this field
    like_rent_listing.short_description = 'Liked Rent Listing Title'

    def response_change(self, request, obj):
        self.message_user(request, f'The like for "{obj.social_like.title if obj.social_like else "Unknown"}" was changed successfully.', level='success')
        return HttpResponseRedirect(request.path_info)
    
    def response_add(self, request, obj):
        self.message_user(request, f'The like for "{obj.social_like.title if obj.social_like else "Unknown"}" was added successfully.', level='success')
        return HttpResponseRedirect(request.path_info)

admin.site.register(Like, LikeAdmin)
