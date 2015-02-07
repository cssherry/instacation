# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150207041101) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albums", force: true do |t|
    t.integer  "owner_id",    null: false
    t.string   "title",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "location_id"
  end

  add_index "albums", ["location_id"], name: "index_albums_on_location_id", using: :btree
  add_index "albums", ["owner_id"], name: "index_albums_on_owner_id", using: :btree

  create_table "locations", force: true do |t|
    t.string   "street_number"
    t.string   "street"
    t.string   "city",          null: false
    t.string   "state",         null: false
    t.string   "country",       null: false
    t.string   "place_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "locations", ["place_id"], name: "index_locations_on_place_id", using: :btree

  create_table "photos", force: true do |t|
    t.integer  "album_id",                  null: false
    t.string   "caption"
    t.integer  "order",         default: 0
    t.string   "photo_url",                 null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "cloudinary_id",             null: false
    t.integer  "location_id"
  end

  add_index "photos", ["album_id"], name: "index_photos_on_album_id", using: :btree
  add_index "photos", ["location_id"], name: "index_photos_on_location_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "first_name",      null: false
    t.string   "last_name",       null: false
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
