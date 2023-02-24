class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :birthday, null: false
      t.string :gender, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :bio, default: ""
      t.string :work, default: ""
      t.string :highschool, default: ""
      t.string :college, default: ""
      t.string :city, default: ""
      t.string :hometown, default: ""
      t.string :relationship, default: ""
      t.string :hobbies, default: ""
      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
