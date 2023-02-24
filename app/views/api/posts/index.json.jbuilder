users = Hash.new

json.posts do
    @posts.each do |post|
        users[post.user.id] = post.user
        json.set! post.id do
            json.partial! 'post', post: post
        end
    end
end

json.users do
    users.values.each do |user|
        json.set! user.id do
            # json.partial! '/api/users/user', user: user
            json.extract! user, :id, :email, :first_name, :last_name, :birthday, :gender, :created_at, :updated_at, :post_ids, :bio, :work, :highschool, :college, :city, :hometown, :relationship
        end
    end
end

# json.users users

# {
#     '1': {},
#     '2': {}
# }

# { 
#     'posts': {
#         '1': {},
#         '2': {}
#     },
#     'users': {
#         '1': {}
#     }
# }