@friends.each do |friend|
    json.set! friend.id do 
        json.id friend.id
        json.sender_id friend.sender_id
        json.receiver_id friend.receiver_id
        json.accept friend.accept
        json.decline friend.decline
    end
end