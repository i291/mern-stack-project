import React, { Component } from 'react';
import usersServer from '../services/users'
import exercisesServer from '../services/exercises'
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom';




export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2=this.onChangePassword2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    

    this.state = {
      username: '',
      password: '',
      password2:'',
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
  onChangePassword2(e){
      this.setState({
          password2:e.target.value
      })
  }


  onSubmit (e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      pass:this.state.password
    }  

    const userRegister=async(user)=>{
        if(this.state.password === this.state.password2){
            try{
                const korisnik=await usersServer.Register(user)
                window.localStorage.setItem('prijavljeniKorisnik',JSON.stringify(korisnik))
      
                exercisesServer.postaviToken(korisnik.token)
                window.location="/list"


            }catch{
                alert("user already exist!")


            }
           
    
        }else{
            alert("lozinke se ne podudaraju")
        }
      
      }
    userRegister(user)
    this.setState({
      username: '',
      password:'',
      password2:''

    })
    
    
  }

  render() {
   
    return (
    
          <div className="Login">
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
            <Form.Group size="lg" controlId="password2">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.password2}
                onChange={this.onChangePassword2}
              />
            </Form.Group>
              <input type="submit"  value="Register" className="btn btn-primary" />

              <br>
              </br>
              <h2>Already have an account?</h2>
              <Link to="/login" type="button" className="btn btn-primary" >Log-in</Link>    


          </Form>
          </div>
    )
  }
}