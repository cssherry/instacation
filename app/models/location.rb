# == Schema Information
#
# Table name: locations
#
#  id            :integer          not null, primary key
#  street_number :string(255)
#  street        :string(255)
#  city          :string(255)
#  state         :string(255)
#  country       :string(255)      not null
#  place_id      :string(255)      not null
#  created_at    :datetime
#  updated_at    :datetime
#  name          :string(255)      not null
#

class Location < ActiveRecord::Base
  has_many :albums,
           class_name: 'Album',
           foreign_key: :location_id,
           primary_key: :place_id

  has_many :photos,
           class_name: 'Photo',
           foreign_key: :location_id,
           primary_key: :place_id
end
