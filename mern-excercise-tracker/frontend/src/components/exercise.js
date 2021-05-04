
import React, { Component, useEffect ,useState} from 'react';
import { Link } from 'react-router-dom';
import exercisesServer from '../services/exercises';
//function component

const Exercise = props => {
  
    return(
          <tr>

          <td>{props.exercise.username}</td>
          <td>{props.exercise.description}</td>
          <td>{props.exercise.duration}</td>
          <td>{props.exercise.date.substring(0,10)}</td>
          <td>
            <a href={"/edit/"+props.exercise._id}>edit</a> | <a href="#" className="test" onClick={() => { props.deleteExercise(props.exercise._id)} }>delete</a>
          </td>
        </tr>
    
          
      
        
       
      )}

export default Exercise