# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  liked      :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#  post_id    :bigint
#
class Like < ApplicationRecord
    validates :liked, inclusion: { in: [true, false] }
  
    belongs_to :user
end
