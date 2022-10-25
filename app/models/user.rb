# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  birthday        :string           not null
#  gender          :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  bio             :string
#  work            :string
#  highschool      :string
#  college         :string
#  city            :string
#  hometown        :string
#  relationship    :string
#  hobbies         :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  # validates :username, 
  #   uniqueness: true, 
  #   length: { in: 3..30 }, 
  #   format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :first_name, :last_name, :gender, :birthday, presence: true
  validates :first_name, :last_name, length: { in: 3..30 }
  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  
  before_validation :ensure_session_token
  has_one_attached :photo
  has_many :posts,
  dependent: :destroy

  has_many :likes,
  dependent: :destroy
    
  def self.find_by_credentials(credential, password)
    field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : nil
    user = User.find_by(field => credential) 
    user&.authenticate(password)
      # user = User.find_by(credential: email)
      # user&.authenticate(password) ? user : nil
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    save!
    self.session_token
  end

  private

  def generate_unique_session_token
      # token = SecureRandom::urlsafe_base64

      # while User.exists?(session_token: token)
      #     token = SecureRandom::urlsafe_base64
      # end
      # token
      loop do
        token = SecureRandom.base64
        break token unless User.exists?(session_token: token)
      end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
