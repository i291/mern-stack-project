import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import exercisesServer from '../services/exercises'



export default class CreateExercises extends Component{
    //stanja, necu pisati let username, nego ovako kao dole radi promjene vrijednosti

    constructor(props){
        super(props)
        
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);    


        this.state={
            username : '',
            description:'',
            duration: 0,
            date: new Date(),
            users:[]


        }
    }
   
   

    componentDidMount() {

     
      const prijavKorisnik=window.localStorage.getItem('prijavljeniKorisnik')
      console.log(prijavKorisnik)
      if(prijavKorisnik){
        const korisnik=JSON.parse(prijavKorisnik)
        exercisesServer.postaviToken(korisnik.token)
        this.setState({
          username:JSON.parse(prijavKorisnik).username
        })
      }
     
      
    
      }

   
    onChangeDescription(e) {
        this.setState({
          description: e.target.value
        })
      }
    
      onChangeDuration(e) {
        this.setState({
          duration: e.target.value
        })
      }
    
      onChangeDate(date) {
          //this se referencira na cijelu klasu

        this.setState({
          date: date
        })
      }
    
    onSubmit(e) {
        e.preventDefault();
        
    
        const exercise = {
          username:this.state.username,
          description: this.state.description,
          duration: this.state.duration,
          date: this.state.date,

        }
        
    
        console.log(exercise);
        exercisesServer.spremiKorisnikovuVježbu(exercise)
          .then(res => console.log(res.data))
        window.confirm("uspiješno dodana nova vježba");
          window.location = '/list';


        

    
        
      }
      render() {
          return (
            <div>
              <h3>Create Your Own Exercise,{this.state.username}</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                 
                </div>
                <div className="form-group"> 
                  <label>Description: </label>
                  <input  type="text"
                      required
                      className="form-control"
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      />
                </div>
                <div className="form-group">
                  <label>Duration (in minutes): </label>
                  <input 
                      type="text" 
                      className="form-control"
                      value={this.state.duration}
                      onChange={this.onChangeDuration}
                      />
                </div>
                <div className="form-group">
                  <label>Date: </label>
                  <div>
                    <DatePicker
                      selected={this.state.date}
                      onChange={this.onChangeDate}
                    />
                  </div>
                </div>
        
                <div className="form-group">
                  <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
              </form>
            </div>
            )

        
        
      }
}