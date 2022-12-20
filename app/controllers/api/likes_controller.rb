class Api::LikesController < ApplicationController

    def create
        # params[:like][:user_id] = @current_user.id
        @like = Like.new(like_params)
        if @like.save
            render "api/likes/show"
        else
            render json: @like.errors.full_messages, status: 422
        end
    end
    def show
        @like = Like.find(params[:id])
        render :show
    end
    def index
        @likes = Like.all
        render :index
    end
    
    def update
        @like = Like.find(params[:id])
        if @like.update(like_params)
            render :show
        else
            render json: @like.errors.full_messages, status: 422
        end
    end

    def destroy
        @like = Like.find(params[:like][:user_id])
        if @like
            @like.destroy
        end
        head :no_content
    end

    private
    def like_params
        params.require(:like).permit(:liked, :user_id, :post_id)
    end
end
