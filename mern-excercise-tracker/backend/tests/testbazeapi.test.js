const mongoose=require('mongoose');
const supertest=require('supertest');
const Exercise=require('../models/excercise.model')
const pomocni=require('./pomocni')
const app=require('../server');
const { use } = require('../routes/users');
const { response } = require('express');
const jwt=require('jsonwebtoken')
const api= supertest(app)
let token;
  beforeEach( async () => {
    await Exercise.deleteMany({})
    let objektVježba = new Exercise(pomocni.pocetneVježbe[0])
    await objektVježba.save()
    objektVježba = new Exercise(pomocni.pocetneVježbe[1])
    await objektVježba.save()
    objektVježba = new Exercise(pomocni.pocetneVježbe[2])
    await objektVježba.save()
  })


test("vježbe se vraćaju kao JSON",async()=>{
    await api.get('/exercises')
    .expect(200)
    .expect("Content-Type",/application\/json/)
})
test("baza ima točno 3 vježbe",async()=>{
    const odgovor=await api.get('/exercises')
    expect(odgovor.body).toHaveLength(pomocni.pocetneVježbe.length)
})
test("provjera sadrzaja neke vjezbe",async()=>{
    const odgovor=await api.get('/exercises')
    const opis=odgovor.body.map(vj=>vj.description)
    expect(opis).toContain("running")
})

//testiranje POST RUTE
test("dodavanje ispravne vježbe",async()=>{
   
    const nova={
        username:'admin',
        description:"sleeping",
        duration:300,
        date:'2021-02-09T09:27:59.255+00:00'

    }
    const user={
      username:'admin',
      id:"6026314d25142915cc2592de"

    }
    token=jwt.sign(user,process.env.SECRET)
    await api
    .post('/exercises/add')
    .set('Authorization', `Bearer ${token}`)
    .send(nova)
    //jeli odgovor 200
    .expect(200)
    //zato jer nam post rua ujedino i vraća novo dodanu vježbu
    .expect("Content-Type",/application\/json/)
    //dohvatim sve vježbe i sve opise vježbi
    const odgovor=await pomocni.vjezbeIzBaze()
    const opis=odgovor.map(vj=>vj.description)
    expect(opis).toContain("sleeping")
    expect(odgovor).toHaveLength(pomocni.pocetneVježbe.length+1)


})

  test('dohvat specificne vježbe', async () => {
    //rucni dohvat
    const vježbePocetak = await pomocni.vjezbeIzBaze()
    const trazenavjezba = vježbePocetak[0]
  //dohvat preko rute
    const odgovor = await api
    .get(`/exercises/${trazenavjezba._id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
    const jsonVjezba = JSON.parse(JSON.stringify(trazenavjezba))
    expect(odgovor.body).toEqual(jsonVjezba)
  })

  

afterAll( ()=>{
    mongoose.connection.close()
})