class Api::CommentsController < ApplicationController
    # before_action :require_logged_in, only: [:new, :create]


    def show 
        @comment = Comment.find(params[:id])
        render :show
    end
    def index
        @comments = Comment.all
        render :index
    end

    def create
        # @post = Post.find(params[:post_id])
        # @comment = @post.comments.create(comment_params)
        @comment = Comment.new(comment_params)
        
        if @comment.save!
            render 'api/comments/show'
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def edit
        @comment = Comment.find(params[:id])
    end

    def update
        @comment = Post.find(params[:id])
        if @comment.update(comment_params)
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
        params.require(:comment).permit(:body, :post_id, :user_id)
    end
end
