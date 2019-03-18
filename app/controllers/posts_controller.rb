class PostsController < ApplicationController
  before_action :set_post, only: [:update, :destroy]
   
  def index
    @posts = Post.paginate(:page => params[:page],:per_page => 2)
     render json: {
       posts: @posts,
      page: @posts.current_page,
      pages: @posts.total_pages
     } 
  end
  
  def create
    post = Post.new(post_params)
      if post.save
        render json: post
      else
        render nothing: true, status: :bad_request
      end
    
  end
  
  def update
    puts params[:category_id].inspect
    puts "***********"
      if @post.update(post_params)
        render json: @post
      else
        render nothing: true, status: :unprocessable_entity
      end
  end
  
  def destroy
    @post.destroy
    head :no_content
  end
  
  def search
    query = params[:query]
    posts = Post.where('name LIKE ? OR title LIKE ? OR author LIKE ?',
                       "%#{query}%", "%#{query}%", "%#{query}%")
    render json: posts
  end
  
  def set_post
      @post = Post.find(params[:id])
    end
  
  private

    def post_params
      params.require(:post).permit(:name,:title, :author,:description,:category_id)
    end

end
