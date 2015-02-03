class SessionController < ApplicationController
  def new
  end

  def create
    username = params[:user][:username]
    password = params[:user][:password]
    user = User.find_by_credentials(username, password)

    if user
      sign_in(user)
      redirect_to user_url(user)
    else
      flash.now[:errors] = ["Invalid username and password combination"]
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end
end
