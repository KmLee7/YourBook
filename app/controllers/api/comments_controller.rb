class Api::CommentsController < ApplicationController
    # before_action :require_logged_in, only: [:new, :create]

    def new
        @comment = Comment.new(post_id: params[:post_id])
    end

    def create
        @comment = current_user.comments.new(comment_params)

        if @comment.save!
            render 'api/posts/show/comments/show'
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def edit
        @comment = Comment.find(params[:id])
    end

    def update
        @comment = Post.find(update_comment_params[:id])
        if @comment.update(update_comment_params)
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        if @comment
            @comment.destroy
        end
        head :no_content
    end

    private
    def comment_params
        params.require(:comment).permit(:content, :id)
    end
    def update_comment_params
        params.require(:comment).permit(:content,:id)
    end
end
