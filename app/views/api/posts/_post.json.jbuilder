json.extract! post, :id, :content, :user_id
json.set! :photo, post.photo.url