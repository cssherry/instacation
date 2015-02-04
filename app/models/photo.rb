# == Schema Information
#
# Table name: photos
#
#  id         :integer          not null, primary key
#  album_id   :integer          not null
#  caption    :string(255)
#  order      :integer          default(0)
#  photo_url  :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

class Photo < ActiveRecord::Base
  belongs_to :album

end
