module Api
  class LocationsController < ApiController
    def create
      @location = Location.new(location_params)
      if @location.save
        render json: @location
      else
        render json: @location.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @location = Location.find(params[:id])
      @location.destroy
      render json: {}
    end

    def show
      @location = Location.find(params[:id])
    end

    def index
      @locations = Location.all
    end

    private

    def location_params
      params.require(:location).permit(:street_number, :street, :city, :state, :country, :place_id, :updated_at)
    end
  end
end
