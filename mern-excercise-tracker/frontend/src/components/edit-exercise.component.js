import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import exercisesServer from '../services/exercises';

export default class EditExercise extends Component {

  constructor(props) {
    super(props);
    
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      a:false,
      date: new Date()
    }
  }

  componentDidMount() {
     

      const prijavKorisnik=window.localStorage.getItem('prijavljeniKorisnik')
      if(prijavKorisnik){
        const korisnik=JSON.parse(prijavKorisnik)
        exercisesServer.postaviToken(korisnik.token)
        this.setState({
          username:JSON.parse(prijavKorisnik).username,

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
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }


    
    exercisesServer.updejtajVjezbu(this.props.match.params.id, exercise)
       .then(response => { 
            console.log(response.data)
            console.log(response);
            window.confirm("Vježba uspješno promjenjena!");
            if(window.confirm)
            {
              window.location = '/list';

            }
          })
           .catch(err=> {
             
            if(err.message === 'Request failed with status code 401'){
              console.log(this.state.a);
              this.setState({a:true})
              console.log(this.state.a);
            window.confirm("ne mozes mijenjati tuđu vježbu!");
            if(window.confirm)
            {
              window.location = '/list';

            }


              
          }});
         

  }

  

  render() {
    return (
    <div>
      <h3>Edit your exercise</h3>
      <label>{this.state.username}</label>
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
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}