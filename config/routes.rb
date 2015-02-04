Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :user_data, only: [:show]
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  resources :albums
  resources :photos
end
