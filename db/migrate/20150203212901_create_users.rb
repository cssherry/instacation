class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :username, null: false, index: true, unique: true
      t.string :password_digest, null: false
      t.string :session_token, null: false, index: true, unique: true

      t.timestamps
    end
  end
end
