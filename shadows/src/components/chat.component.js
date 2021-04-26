
import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';


export default class InfoPanel extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    // this.onChangeDescription = this.onChangeDescription.bind(this);
    // this.onChangeDuration = this.onChangeDuration.bind(this);
    // this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
      duration: 0,
      date: new Date(),
      avl_sp: [], 
      topics: []
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

  onSubmit(e) {
    e.preventDefault();
    // this.props.handleData(this.state.title)
    window.location = '/start-chat'
  }

  render() {
    return (
      <div>
      <h3>Start New Anonymous Chat</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Topic: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}>
              {
                this.state.topics.map(function(topic) {
                  return <option 
                    key={topic}
                    avl_sp={topic.avl_sp}
                    value={topic.title}>{topic}
                    </option>;
                })
              }
          </select>
        </div>

        <div className="form-group">
        <input type="submit" value="Start Chat" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
