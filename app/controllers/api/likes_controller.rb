class Api::LikeController < ApplicationController

    def create
        # params[:like][:user_id] = @current_user.id
        @like = Like.new(like_params)
        if @like.save
            render "api/like/show"
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
