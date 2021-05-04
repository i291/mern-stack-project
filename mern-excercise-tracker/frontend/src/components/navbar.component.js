import React, { Component } from 'react';
//to link different routes (radi link to)
import { Link } from 'react-router-dom';
const userlogout=async(e)=>{
  e.preventDefault()
  window.localStorage.clear()
  window.location="/"
  
}


export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">ExcerTracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/list" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/statistika" className="nav-link">My Statistics</Link>

          </li>
          <li className="navbar-item">
          <Link to="/" type="button" className="btn btn-secondary" onClick={userlogout}>Log-out</Link>    
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}