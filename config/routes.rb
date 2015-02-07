Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :albums, except: [:new, :edit, :index]
    resources :photos, except: [:new, :edit, :index]
    resources :user_data, only: [:show]
    resources :locations, except: [:new, :edit, :update]
  end
end
