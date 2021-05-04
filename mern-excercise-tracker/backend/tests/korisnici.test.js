const bcrypt = require('bcrypt')
const Korisnik = require('../models/user.model')
const pomocni = require('./pomocni')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../server')
const api = supertest(app)

beforeEach(async () => {
  await Korisnik.deleteMany({})

  const passHash = await bcrypt.hash('tajna', 10)
  const korisnik = new Korisnik({username: 'admin', passHash})

  await korisnik.save()
})

  test('stvara se novi korisnik sa ispravnim username', async () =>{
    const pocetniKorisnici = await pomocni.korisniciUBazi()

    const novi = {
      username: 'iradalj',
      pass: 'oarwa'
    }

    await api
    .post('/users/add')
    .send(novi)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const korisniciKraj = await pomocni.korisniciUBazi()
    expect(korisniciKraj).toHaveLength(pocetniKorisnici.length + 1)

    const korImena = korisniciKraj.map(u => u.username)
    expect(korImena).toContain(novi.username)
  }) 

  test('ispravno vraca pogresku ako vec postoji username', async () =>{
    const pocetniKorisnici = await pomocni.korisniciUBazi()

    const novi = {
      username: 'admin',
      pass: 'oarwa'
    }

    const rezultat = await api
    .post('/users/add')
    .send(novi)
    .expect(401)
    .expect('Content-Type', /application\/json/)

    expect(rezultat.body.error).toContain('Request failed with status code 401')

    const korisniciKraj = await pomocni.korisniciUBazi()
    expect(korisniciKraj).toHaveLength(pocetniKorisnici.length)
  })

afterAll(async () => {
  await mongoose.connection.close()
})