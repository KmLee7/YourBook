users = Hash.new

# json.comments do
    @comments.each do |comment|
        # posts[comment.post.id] = comment.post
        # users[comment.user.id] = comment.user
        json.set! comment.id do
            json.partial! 'comment', comment: comment
        end
    end
# end

# json.comments do |comment|
#         # posts[comment.post.id] = comment.post
#         # users[comment.user.id] = comment.user
#         json.set! comment.id do
#             json.partial! 'comment', comment: comment
#         # end
#     end
# end

# json.comments do
#     @comments.each do |comment|
#         posts[comment.post.id] = comment.post
#         json.set! comment.id do
#             json.partial! 'comment', comment: comment
#         end
#     end
# end


json.users do
    users.values.each do |user|
        json.set! user.id do
            # json.partial! '/api/users/user', user: user
            json.extract! user, :id, :email, :first_name, :last_name, :birthday, :gender, :created_at, :updated_at, :post_ids
        end
    end
end