module Api
  class UserDataController < ApiController
    helper_method :owner?

    def show
      @user = User.find(params[:id])
    end

    private
    
    def owner?
      current_user.id == params[:id] ? true : false
    end
  end
end
