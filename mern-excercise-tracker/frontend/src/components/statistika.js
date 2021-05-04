import React, { Component, useEffect ,useState} from 'react';
import {Bar,Line,Pie} from 'react-chartjs-2';
import exercisesServer from '../services/exercises';
const Exercise = props => {
    const ukupno=0
   
  
    return(
        <tr>
          <td>{props.exercise.username}</td>
          <td>{props.exercise.description}</td>
          <td>{props.exercise.duration}</td>
          <td>{props.exercise.date.substring(0,10)}</td>
        </tr>

)}
const BarChart = props => {
  const niz=[]
  const niz2=[]
  console.log(props.exercise);
  for (let index = 0; index < props.exercise.length; index++) {
    const element = props.exercise[index].duration;
    const element2=props.exercise[index].date
    niz.push(element);
    niz2.push(element2)
    
  }
    
    return (
        <div>
            <Bar
                
                data={{
                    labels: niz2,
                    datasets:[
                        {
                          
                            label:'minutes of traninig for each day',
                            backgroundColor: 'rgba(164, 176, 239, 1)',
                            borderColor: 'rgba(37, 65, 208, 1)',
                            borderWidth: 2,
                            data:niz,
                            
                        }
                    ]
                }}
                options={{
                    scales:{
                        yAxes:[{
                          ticks:{
                            beginAtZero:true
                          }
                            
                        }]
                    }
                }}
                
            />

        </div>
    )
}  
      
     
      

export default class ExercisesList extends Component{

    constructor(props){
        super(props)
        this.state={
        exercises:[],
        exercises2:[],
        username:null,
        dani:[],
        ukupno:0,
        ukupno2:[]

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


        exercisesServer.dohvatiKorisnikoveVjezbe()
        .then(response => {
            // console.log(response)
            this.setState({exercises:response})
            this.state.exercises.forEach(element => {
                this.setState({ukupno: this.state.ukupno+ element.duration})
            
                
            });
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
            
            if(err.toJSON().message === 'Request failed with status code 401'){
            alert("ne mozes brisati tuđu vježbu!")
          }})

          

         
    
        
      }
      Baar(){
          return <BarChart exercise={this.state.exercises} ukupno={this.state.ukupno}/>
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
                  </tr>
                </thead>
                <tbody>
                  { this.exerciseList() }
                </tbody>
              </table>
              <br>
              </br>
            <h2>You trained for {this.state.ukupno} minutes.</h2>
            {this.Baar()}
            </div>
          )

      }
}