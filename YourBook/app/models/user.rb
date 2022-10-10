class User < ApplicationRecord
    has_secure_password
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true, length: { in: 3..255 }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }
  
    before_validation :ensure_session_token
  
    has_many :posts,
      dependent: :destroy
  
    has_many :likes,
      dependent: :destroy
  
    def self.find_by_credentials(email, password)
      user = User.find_by(email: email)
      user&.authenticate(password) ? user : nil
    end
  
    def reset_session_token!
      self.session_token = generate_unique_session_token
      save!
      session_token
    end
  
    private
    def generate_unique_session_token
      while true
        token = SecureRandom.urlsafe_base64
        return token unless User.exists?(session_token: token)
      end
    end
  
    def ensure_session_token
      self.session_token ||= generate_unique_session_token
    end
  end
