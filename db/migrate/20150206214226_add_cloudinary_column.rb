class AddCloudinaryColumn < ActiveRecord::Migration
  def change
    add_column :photos, :cloudinary_id, :string, null: false
  end
end
