class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if params[:password_confirm] != user_params[:password]
      flash.now[:errors] = ["Passwords don't match. Try again"]
      render :new
    elsif @user.save
      sign_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

private
  def user_params
    params.require(:user).permit(:password, :username, :first_name, :last_name)
  end
end
