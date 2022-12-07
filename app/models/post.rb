# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
class Post < ApplicationRecord
    validates :content, presence: true
    has_one_attached :photo
    has_many :comments,
        foreign_key: :post_id,
        dependent: :destroy

    belongs_to :user
end
