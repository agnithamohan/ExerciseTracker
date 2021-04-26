import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Shadows</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/chat" className="nav-link">Chat</Link>
          </li>
          <li className="navbar-item">
          <Link to="/info" className="nav-link">Info Panel</Link>
          </li>
          <li className="navbar-item">
          <Link to="/discussion" className="nav-link">Discussion Forum</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}