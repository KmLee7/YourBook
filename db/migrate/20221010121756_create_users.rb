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
      t.string :bio
      t.string :work
      t.string :highschool
      t.string :college
      t.string :city
      t.string :hometown
      t.string :relationship
      t.string :hobbies
      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
