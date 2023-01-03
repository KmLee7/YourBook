class CreateFriends < ActiveRecord::Migration[7.0]
  def change
    create_table :friends do |t|
      t.integer :sender_id, null: false 
      t.integer :receiver_id, null: false
      t.boolean :accept, default: false, null: false
      t.boolean :pending, default: false, null: false
      t.timestamps
    end
    add_index :friends, :sender_id
    add_index :friends, :receiver_id
  end
end
