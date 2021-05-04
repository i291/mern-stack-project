import { BrowserRouter as Router, Route} from "react-router-dom";
import React, { useState, useEffect } from 'react'

import './App.css';
//butstrap!
import "bootstrap/dist/css/bootstrap.min.css";
//importala sam sve komponente da ih mogu koristit ode
import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import Register from "./components/register";
import Statistika from "./components/statistika";

const  App=(props) =>{

  const [korisnik,postaviKorisnika]=useState(null)

  useEffect(() => {
    const prijavKorisnik=window.localStorage.getItem('prijavljeniKorisnik')
    if(prijavKorisnik){
        const korisnik=JSON.parse(prijavKorisnik)
      
      postaviKorisnika(korisnik)
    }
   
  }, [korisnik])



  return (
    <Router>
      {korisnik === null
      ? <div>
      <Route path="/" exact component={Register} />
      <Route path="/login" exact component={CreateUser} />
      </div>


      :<div>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/statistika" component={Statistika} />
      <Route path="/list" component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      </div>

      </div>

      
      }

     
    </Router>
  );
}

export default App;
