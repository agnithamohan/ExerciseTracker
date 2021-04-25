
import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

function commentList(comments)  {
  return comments.map(currentComment => {
    return <tr>{currentComment}</tr> ;
  })
};
const Post = props => (
  <tr>
    <td>{props.post.title}</td>
    <td>{props.post.description}</td>
    <td>
      {commentList(props.post.comments)}
    </td>
  </tr>
)
export default class InfoPanel extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeComments = this.onChangeComments.bind(this);
    // this.onChangeDuration = this.onChangeDuration.bind(this);
    // this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
      comments: [],
      duration: 0,
      date: new Date(),
      avl_sp: [], 
      topics: [], 
      posts: [{"title":"LaLaLa", "description":"jajsj", "comments":["hi", "I agree"]}, {"title":"Kakk", "description":"nsd", "comments":["jd", "I jdj"]}]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/topics')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            topics: response.data.map(topic => topic.title),
            title: response.data[0].title,
            avl_sp: response.data[0].avl_sp
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
      avl_sp: e.target.avl_sp
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onChangeComments(e) {
    this.setState({
      comments: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    // this.props.handleData(this.state.title)
  }



  postList() {
    return this.state.posts.map(currentpost => {
      return <Post post={currentpost}/>;
    })
  }
  render() {
    return (
        <div>
        <h3>Start New Anonymous Chat</h3>
        <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Post title: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  />
          </div>
          <div className="form-group"> 
              <label>Post: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
          </div>

          <div className="form-group">
          <input type="submit" value="Post Discussion" className="btn btn-primary" />
          </div>
        </form>

        <h3>Previous Posts</h3>
         <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            { this.postList() }
          </tbody>
        </table> 

      </div>
    )
  }
}
