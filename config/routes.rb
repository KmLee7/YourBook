Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update] 
    resources :comments, only: [:index, :show, :create, :update, :destroy]
    resources :posts, only: [:index, :show, :create, :update, :destroy] 
    resources :likes, only: [:create, :index, :show, :update, :destroy]
    resources :friends, only: [:create, :index, :show, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
