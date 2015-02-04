class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.integer :author_id, null: false, index: true
      t.integer :album_id, null: false, index: true
      t.string :caption
      t.integer :order, default: 0
      t.string :photo_url, null: false
      t.timestamps
    end
  end
end
