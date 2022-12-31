class CreateFriends < ActiveRecord::Migration[7.0]
  def change
    create_table :friends do |t|
      t.integer :sender_id, null: false, foreign_key: {to_table: users}
      t.integer :receiver_id, null: false, foreign_key: {to_table: users}
      t.boolean :accept, default: false, null: false
      t.boolean :decline, default: false, null: false 
      t.timestamps
    end
  end
end
