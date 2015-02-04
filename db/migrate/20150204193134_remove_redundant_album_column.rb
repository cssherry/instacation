class RemoveRedundantAlbumColumn < ActiveRecord::Migration

  def up
    remove_column :albums, :photo_id
  end
  def down
    add_column :albums, :photo_id
  end

end
