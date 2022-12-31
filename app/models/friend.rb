class Friend < ApplicationRecord
    validates :sender_id, presence: true
    validates :receiver_id, presence: true
    validates :accept, inclusion: {in: [true, false]}
    validatse :decline inclusion: {in: [true, false]}

    belongs_to :user
end
