class Api::PostsController < ApplicationController

    def index
        @posts = Post.all
        render :index
    end

    def show
        @post = Post.find(params[:id])
        render :show
    end

    def create
        @post = Post.new(post_params)
        @post.user_id = current_user.id
        # debugger
        if @post.save
            render 'api/posts/show'
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    def edit
        @post = Post.find(params[:id])
      end

    def update
        @post = Post.find(update_params[:id])
        if @post.update(update_params)
            render :show
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    def destroy
        @post = Post.find(params[:id])
        if @post
            @post.destroy
        end
        head :no_content
    end

    private
    def post_params
        params.require(:post).permit(:content, :id)
    end
    def update_params
        params.require(:post).permit(:content, :id)
    end
end
