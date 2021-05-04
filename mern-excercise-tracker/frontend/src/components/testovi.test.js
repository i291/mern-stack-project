    //Testovi se vrte u Watch Mod-u dole u konzoli, ako lupim enter pokrene ih ponovo i svaki put kad nes ode sejvam testovi se automatski pokrecu bez npm test
    import { BrowserRouter } from 'react-router-dom'
    import renderer from "react-test-renderer";
    import { Link } from 'react-router-dom';
    import React from 'react'
    import reactDOM from 'react-dom'
    import '@testing-library/jest-dom/extend-expect'
    import {render,fireEvent } from '@testing-library/react'
    import App from '../App';
    import EditExercise from './edit-exercise.component'
    import { configure,mount,shallow } from "enzyme";
    import Adapter from "enzyme-adapter-react-16";
    import Login from './create-user.component'
    import Create from './create-exercise.component'
    import Exercise from './exercise'
    import { Component } from 'react';
    import { createMemoryHistory } from "history";
    import { Router } from 'express';

    configure({ adapter: new Adapter() });

    test('renders App without crashing', () => {
        //shallow generira samo jednu komponentu
        shallow(<App />);
    });
    test('renders text on Edit page ', () => {
       const wrapper = shallow(<EditExercise/>)
       const header= <h3>Edit your exercise</h3>

       expect(wrapper.contains(header)).toEqual(true);

    });
    test ('Has a button',()=> {
      const root=document.createElement("div")
      reactDOM.render(<BrowserRouter><Login/></BrowserRouter> ,root)
      expect(root.querySelector("button").textContent).toBe("Log-in")

    }
    );
    test('exercises.js',()=>{
      const novavjezba={
        username:'ivana',
        description:'running',
        duration:300,
        date:'2021-02-09T09:27:59.255+00:00'
      }
      const komponenta=render(<Exercise exercise={novavjezba}/>)
      expect(komponenta.container).toHaveTextContent('ivana')


    })
    test('click handler',()=>{
      const novavjezba={
        username:'ivana',
        description:'running',
        duration:300,
        date:'2021-02-09T09:27:59.255+00:00'
      }
      const testhandler=jest.fn()
      const komponenta=render(<Exercise exercise={novavjezba} deleteExercise={testhandler} />)
      const button=komponenta.container.querySelector(".test")
      fireEvent.click(button)
      expect(testhandler.mock.calls).toHaveLength(1)

    })
   
   

    
    
        
       
    