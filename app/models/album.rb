# == Schema Information
#
# Table name: albums
#
#  id          :integer          not null, primary key
#  owner_id    :integer          not null
#  title       :string(255)      not null
#  created_at  :datetime
#  updated_at  :datetime
#  location_id :integer
#

class Album < ActiveRecord::Base
  validates :owner_id, :title, presence: true

  has_one :location_tag, as: :taggable
  has_one :location, through: :location_tag, source: :location

  belongs_to :user,
             class_name: 'User',
             foreign_key: :owner_id,
             primary_key: :id

  has_many :photos
end
