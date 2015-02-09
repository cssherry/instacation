class ChangeAlbumsAndPhotosTable < ActiveRecord::Migration
  def up
    change_column :albums, :location_id, :string
    change_column :photos, :location_id, :string
  end
  def down
    change_column :albums, :location_id, :integer
    change_column :photos, :location_id, :integer
  end
end
