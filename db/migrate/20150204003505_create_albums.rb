class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.integer :owner_id, null: false, index: true
      t.string :title, null: false
      t.integer :photo_id, null: false, index: true
      t.timestamps
    end

    add_index :users, :session_token, unique: true
    add_index :users, :username, unique: true
  end
end
