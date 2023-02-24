json.array! @users do |user|
    json.extract! user, :id, :email, :first_name, :last_name, :birthday, :gender, :created_at, :updated_at, :post_ids, :bio, :work, :highschool, :college, :city, :hometown, :relationship
end

# @users.each do |user|
#     json.set! user.id do 
#         json.partial! 'user', user: user
#     end
# end