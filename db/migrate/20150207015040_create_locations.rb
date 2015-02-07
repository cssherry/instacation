class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :street_number
      t.string :street
      t.string :city, null: false
      t.string :state, null: false
      t.string :country, null: false
      t.string :place_id

      t.timestamps
    end

    add_index :locations, :place_id
  end
end
