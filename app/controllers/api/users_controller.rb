class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password'] + ['first_name'] + ['last_name']

  def index
    @users = User.all
    render :index
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  def update
    @user = User.find(update_params[:id])
    if @user.update(update_params)
      @user.update(update_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end
  
  def show
    @user = User.find(params[:id])
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:id, :email, :first_name, :last_name, :gender, :birthday, :password, :bio, :work, :highschool, :college, :city, :hometown, :relationship)
  end

  def update_params 
    params.require(:user).permit(:id, :email, :first_name, :last_name, :gender, :birthday, :password, :bio, :work, :highschool, :college, :city, :hometown, :relationship)
  end 
end
