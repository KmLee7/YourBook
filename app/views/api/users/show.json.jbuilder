json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :birthday, :gender, :created_at, :updated_at, :post_ids, :bio, :work, :highschool, :college, :city, :hometown, :relationship
end

json.posts do
    @user.posts.each do |post|
        json.set! post.id do
            json.extract! post, :content
        end
    end
end


# json.user do
#     json.extract! @user.posts, :user_id, :content
# end