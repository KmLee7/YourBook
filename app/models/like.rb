class Like < ApplicationRecord
    validates :liked, inclusion: { in: [true, false] }
  
    belongs_to :posts
  
    belongs_to :user
  end
