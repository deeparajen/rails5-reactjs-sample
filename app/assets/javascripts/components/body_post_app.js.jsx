class BodyPostApp extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      posts: [],
      categories: [],
      page: 1,
      pages: 0
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
    this.handleUpdateRecord = this.handleUpdateRecord.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }


handleUpdateRecord(old_post, post)
{
	var posts = this.state.posts.slice();
    var index = posts.indexOf(old_post);
    posts.splice(index, 1, post);
    this.setState({ posts: posts });
}

handleDeleteRecord(post_id)
{
	this.setState((prevState) => ({
        posts: prevState.posts.filter((option) => {
            return post_id !== option.id;
        })
     }))
}

handleAdd(post)
{
	 var posts = this.state.posts;
     posts.push(post);
     this.setState({ posts: posts });
}

handleChangePage(data) {
	this.setState({ posts : data.posts });
	this.setState({ page: data.page });
	this.setState({ pages: data.pages });
}

componentDidMount(){
    /*fetch('/posts.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ posts: data }) });  */
     
    var self = this;
    $.ajax({
      url: '/posts/',
      data: { page: self.state.page },
      success: function(data) {
        self.setState({ posts: data.posts, pages: parseInt(data.pages), page: parseInt(data.page) });
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from POSTS Controller: ', error);
      }
});
      
    fetch('/categories.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ categories: data }) });
  }
 

render(){
    return(
    	
     
     <div>
       <div className="row">
      <div className="col-md-12">
         <PostNewForm handleAdd={this.handleAdd} categories = {this.state.categories}/>
      </div>
      </div>
      
      <div className="row">
      <div className="col-md-12">
         <PostTable posts={this.state.posts} categories={this.state.categories} handleDeleteRecord={this.handleDeleteRecord} handleUpdateRecord={this.handleUpdateRecord}/>
         <Pagination page={this.state.page}
                        pages={this.state.pages}
handleChangePage={this.handleChangePage} />
      </div>
      </div>
     </div>
    )
  }
}