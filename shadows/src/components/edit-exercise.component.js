import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: '',
      comment: ''
    }
  }

  onChangeComment(e) {
    this.setState({
      id: this.props.match.params.id,
      comment: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:5000/posts/addcomment/'+this.state.id, {comment:this.state.comment})
    //   .then(res => console.log(res.data));

    window.location = '/discussion';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Your comments: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.comment}
                onChange={this.onChangeComment}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Comments" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}