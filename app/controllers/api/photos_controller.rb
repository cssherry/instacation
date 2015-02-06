module Api
  class PhotosController < ApiController
    def create
      @photo = Photo.new(photo_params)
      if @photo.save
        render json: @photo
      else
        render json: @photo.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @photo = Photo.find(params[:id])
      if editable?(@photo)
        @photo.destroy
        render json: {}
      else
        render json: ["You can't delete this photo"], status: 403
      end
    end

    def show
      @photo = Photo.find(params[:id])
      render json: @photo
    end

    def update
      @photo = Photo.find(params[:id])
      if editable?(@photo)
        if @photo.update_attributes(photo_params)
          render json: @photo
        else
          render json: @photo.errors.full_messages, status: :unprocessable_entity
        end
      else
        render json: ["You can't edit this photo"], status: 403
      end
    end

    private

    def editable?(photo)
      current_user.id == photo.album.user.id
    end

    def photo_params
      params.require(:photo).permit(:caption, :photo_url, :album_id, :order, :created_at, :updated_at)
    end
  end
end
