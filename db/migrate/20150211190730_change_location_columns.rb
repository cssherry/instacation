class ChangeLocationColumns < ActiveRecord::Migration
  def up
    change_column :locations, :city, :string, null: true
    change_column :locations, :state, :string, null: true
    change_column :locations, :place_id, :string, null: false
  end

  def down
    change_column :locations, :city, :string, null: false
    change_column :locations, :state, :string, null: false
    change_column :locations, :place_id, :string, null: true
  end
end
