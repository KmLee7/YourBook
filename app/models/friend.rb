class Friend < ApplicationRecord
    validates :sender_id, presence: true
    validates :receiver_id, presence: true
    validates :accept, inclusion: {in: [true, false]}


    belongs_to :sender,
        class_name: :User
    belongs_to :receiver,
        class_name: :User
end
