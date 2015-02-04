class RemoveAuthorIdFromPhoto < ActiveRecord::Migration
  def up
    remove_column :photos, :author_id
  end
  def down
    add_column :photos, :author_id
  end

  add_index "photos", :album_id
  add_index "albums", :photo_id
  add_index "albums", :owner_id

end
