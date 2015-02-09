# == Schema Information
#
# Table name: albums
#
#  id          :integer          not null, primary key
#  owner_id    :integer          not null
#  title       :string(255)      not null
#  created_at  :datetime
#  updated_at  :datetime
#  location_id :string(255)
#

class Album < ActiveRecord::Base
  validates :owner_id, :title, presence: true

  belongs_to :location,
             class_name: 'Location',
             foreign_key: :location_id,
             primary_key: :place_id

  belongs_to :user,
             class_name: 'User',
             foreign_key: :owner_id,
             primary_key: :id

  has_many :photos, dependent: :destroy
end
