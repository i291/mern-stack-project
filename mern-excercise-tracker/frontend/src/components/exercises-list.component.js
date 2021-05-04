import React, { Component, useEffect ,useState} from 'react';
import { Link } from 'react-router-dom';
import exercisesServer from '../services/exercises';
import Exercise from './exercise';

export default class ExercisesList extends Component{

    constructor(props){
        super(props)
        this.deleteExercise=this.deleteExercise.bind(this)
        this.state={
        exercises:[],
        a:false,
        username:null
        }
    }
    componentDidMount(){


      const prijavKorisnik=window.localStorage.getItem('prijavljeniKorisnik')
      console.log(prijavKorisnik)
      if(prijavKorisnik){
        const korisnik=JSON.parse(prijavKorisnik)
        this.setState({username:korisnik})
        exercisesServer.postaviToken(korisnik.token)
        
      }
        exercisesServer.dohvatiSveVježbe()
        .then(response => {
          console.log(response)
            this.setState({exercises:response})
        })
        .catch((error )=>{
            console.log(error)

        })
    }
   
    deleteExercise(id) {


        exercisesServer.obrisiVjezbu(id)
          .then(response => { 
            
            console.log(response.data)
            this.setState({
              //_id je iz mongoDB-a
            exercises: this.state.exercises.filter(el => el._id !== id)
          })
          }
          
          )
          .catch(err=> {
            console.log(err.toJSON())
            
            if(err.toJSON().message === 'Request failed with status code 401'){
            alert("ne mozes brisati tuđu vježbu!")
          }})

          

         
    
        
      }
      exerciseList() {


        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
      }
      render() {
       

        
          return (
            <div>
              {this.state.username=== null
              ? <br></br>
              : <h2>Hello {this.state.username.username} </h2>

            }
            <br>
            </br>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>USERNAME</th>
                    <th>DESCRIPTION</th>
                    <th>DURATION</th>
                    <th>DATE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  { this.exerciseList() }
                </tbody>
              </table>
            </div>
          )

        
        
        
      }
}