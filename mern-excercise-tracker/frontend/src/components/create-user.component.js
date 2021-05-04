import React, { Component } from 'react';
import usersServer from '../services/users'
import exercisesServer from '../services/exercises'
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom';

const userLogin=async(user)=>{
  try{
    const korisnik=await usersServer.dodajNovogKorisnika(user)
    window.localStorage.setItem('prijavljeniKorisnik',JSON.stringify(korisnik))
    
    exercisesServer.postaviToken(korisnik.token)
    window.location="/list"
  } catch (exception){
    alert('neispravni podaci')

  }

}

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      users:[]
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }


  onSubmit (e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      pass:this.state.password
    }  
    userLogin(user)

   

   
    

    this.setState({
      username: '',
      password:''

    })
    
    
  }

  render() {
    return (
    
          <div className="Login">
          <Link to="/" type="button" className="previous round" >&#8249;</Link>    
          <Form onSubmit={this.onSubmit}>
          <h1 >WELCOME TO EXERCISE TRACKER!</h1>
          <h2 className="h2">TRAIN WITH US!</h2>
            <Form.Group size="lg" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </Form.Group>
              <button type="submit" value="Log-in" className="btn btn-primary" id="submit">Log-in</button>

          </Form>
          </div>
    )
  }
}