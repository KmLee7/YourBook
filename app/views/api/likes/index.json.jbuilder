@likes.each do |like|
    # posts[comment.post.id] = comment.post
    # users[comment.user.id] = comment.user
    json.set! like.id do
        json.id like.id
        json.liked like.liked
        json.user_id like.user_id
        json.post_id like.post_id
    end
end