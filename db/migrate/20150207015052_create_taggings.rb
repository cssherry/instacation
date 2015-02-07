class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :location_taggings do |t|
      t.references :taggable, null: false
      t.integer :location_id, null: false
      t.timestamps
    end

    add_index :location_taggings, :taggable_id
    add_index :location_taggings, :location_id
  end
end
