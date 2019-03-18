Rails.application.routes.draw do
  resources :posts do
    get :search, on: :collection
  end
  
  resources :categories
  root 'dashboard#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
