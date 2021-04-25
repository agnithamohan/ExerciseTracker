
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ReactTinyLink } from "react-tiny-link";

const Info = props => (
    <tr>
        <td>
            <ReactTinyLink
                cardSize="small"
                showGraphic={true}
                maxLine={2}
                minLine={1}
                url={props.info.url}
            />      
            
        </td>
    </tr>
)
// "https://www.youtube.com/watch?v=LRQqN0qPEus", "https://www.youtube.com/watch?v=t4R7hndZ8p8"
export default class InfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {info: []};
    }

    componentDidMount() {
      axios.get('http://localhost:5000/info')
       .then(response => {
         this.setState({ info: response.data });
       })
       .catch((error) => {
          console.log(error);
       })
    }

    infoList() {
        return this.state.info.map(currentinfo => {
            return <Info info={currentinfo}/>;
        })
      }
      
    render() {
        return (
            <div>
            <table className="table">
            <thead className="thead-light">
                <tr>
                <th>Suggested Videos</th>
                </tr>
            </thead>
            <tbody>
                { this.infoList() }
            </tbody>
            </table>
        </div>
        )
  }
}
