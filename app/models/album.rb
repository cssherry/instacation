# == Schema Information
#
# Table name: albums
#
#  id         :integer          not null, primary key
#  owner_id   :integer          not null
#  title      :string(255)      not null
#  photo_id   :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Album < ActiveRecord::Base
  belongs_to :user,
    class_name: 'User',
    foreign_key: :owner_id,
    primary_key: :id

  has_many :photos

end
