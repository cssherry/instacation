module Api
  class AlbumsController < ApiController
    def create
      @album = User.find(params[:id]).albums.new(album_params)
      if @album.save
        render json: @album
      else
        render json: @album.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @album = Album.find(params[:id])
      @album.destroy
      render json: {}
    end

    def show
      @album = Album.find(params[:id])
    end

    def update
      @album = Album.find(params[:id])
      if @album.update_attributes(album_params)
        render json: @album
      else
        render json: @album.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def album_params
      params.require(:album).permit(:title).merge(owner_id: params[:id])
    end
  end
end
