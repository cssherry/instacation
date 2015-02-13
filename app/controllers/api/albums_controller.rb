module Api
  class AlbumsController < ApiController
    def create
      @album = User.find(current_user.id).albums.new(album_params)
      if @album.save
        render json: @album
      else
        render json: @album.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @album = Album.find(params[:id])

      if editable?(@album)
        @album.destroy
        render json: {}
      else
        render json: ["You can't delete this photo"], status: 403
      end
    end

    def show
      @album = Album.find(params[:id])
    end

    def update
      @album = Album.find(params[:id])

      if editable?(@album)
        if @album.update_attributes(album_params)
          render json: @album
        else
          render json: @album.errors.full_messages, status: :unprocessable_entity
        end
      else
        render json: ["You can't edit this photo"], status: 403
      end
    end

    private

    def editable?(album)
      current_user.id == album.user.id
    end

    def album_params
      params.require(:album).permit(:title, :location_id, :description).merge(owner_id: current_user.id)
    end
  end
end
