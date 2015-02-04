module Api
  class PhotosController < ApiController
    def create
      @photo = Album.find(params[:id]).photos.new(photo_params)
      if @photo.save
        render json: @photo
      else
        render json: @photo.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @photo = Photo.find(params[:id])
      @photo.destroy
      render json: {}
    end

    def show
      @photo = Photo.find(params[:id])
      render json: @photo
    end

    def update
      @photo = Photo.find(params[:id])
      if @photo.update_attributes(photo_params)
        render json: @photo
      else
        render json: @photo.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def photo_params
      params.require(:photo).permit(:caption, :url).merge(album_id: params[:id])
    end
  end
end
