class Api::FriendsController < ApplicationController
   
    def create
        
        @friend = Friend.new(friend_params)
        if @friend.save
            render "api/friends/show"
        else
            render json: @friend.errors.full_messages, statues: 422
        end
    end

    def show
        @friend = Frined.find(params[:id])
        render :show
    end

    def index
        @friends = Friend.all
        render :index
    end

    def update
        @friend = Friend.find(params[:id])
        if @friend.update(friend_params)
            render :show
        else
            render json: @friend.errors.full_messages, status: 422
        end
    end
    
    def destroy
        # @friend_one = Friend.find(params[:id][:sender_id])
        @friend_two = Friend.find(params[:id])
        # if @friend_one || @friend_two
        if @friend_two
            # @friend_one.destroy || @friend_two.destroy
            @friend_two.destroy
        end
        head :no_content
    end

    private
    def friend_params
        params.require(:friend).permit(:sender_id, :receiver_id, :accept, :pending)
    end

end
