class AddLocationIdIndex < ActiveRecord::Migration
  def change
    add_index :albums, :location_id
    add_index :photos, :location_id
  end
end
