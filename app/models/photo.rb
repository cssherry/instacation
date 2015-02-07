# == Schema Information
#
# Table name: photos
#
#  id            :integer          not null, primary key
#  album_id      :integer          not null
#  caption       :string(255)
#  order         :integer          default(0)
#  photo_url     :string(255)      not null
#  created_at    :datetime
#  updated_at    :datetime
#  cloudinary_id :string(255)      not null
#  location_id   :integer
#

class Photo < ActiveRecord::Base
  validates :album_id, :photo_url, :cloudinary_id, presence: true
  has_many :location_tags, as: :taggable
  belongs_to :album
end
