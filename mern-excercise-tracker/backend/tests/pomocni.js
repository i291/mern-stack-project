const Exercise=require('../models/excercise.model')
const Korisnik=require('../models/user.model')
const pocetneVježbe = [
    {
      id: 1,
      username: 'admin',
      description: 'running',
      date: '2019-05-30T17:30:31.098Z',

      duration: 200,

    },
    {
        id: 2,
        username: 'vesna',
        description: 'running',
        date: '2019-05-30T17:30:31.098Z',

        duration: 400
    },
    {
        id: 3,
        username: 'igor',
        description: 'running',
        date: '2019-05-30T17:30:31.098Z',

        duration: 500
    }
  ]

  const vjezbeIzBaze = async () => {
    const vjezba = await Exercise.find({})
    return vjezba.map(p => p.toJSON())
  }
   
  const nepostojeciId = async () => {
    const vjezba = new Exercise({ description: "run", date: new Date() })
    await vjezba.save()
    await vjezba.remove()
  
    return vjezba._id.toString()
  }
  
  const korisniciUBazi = async () => {
    const korisnici = await Korisnik.find({})
    return korisnici.map(k => k.toJSON())
  }
  
  
  
  module.exports = {
    pocetneVježbe, vjezbeIzBaze, nepostojeciId, korisniciUBazi
  }