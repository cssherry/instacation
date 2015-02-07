class DeleteLocationTagging < ActiveRecord::Migration
  def up
    drop_table :location_taggings
    add_column :photos, :location_id, :integer
    add_column :albums, :location_id, :integer
  end

  def down
    create_table :location_taggings do |t|
      t.references :taggable, null: false
      t.integer :location_id, null: false
      t.timestamps
    end

    add_index :location_taggings, :taggable_id
    add_index :location_taggings, :location_id

    remove_column :photos, :location_id
    remove_column :albums, :location_id
  end
end
