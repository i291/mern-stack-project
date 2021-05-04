const router = require('express').Router();
const jwt = require('jsonwebtoken')

const Exercise = require('../models/excercise.model');
const User = require('../models/user.model');
const dohvatiToken = req => {
  const auth =req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')){
    return auth.substring(7)
  }
  return null
}
router.route('/').get(async(req, res) => {
  const vjezbe=await Exercise.find({})
  res.json(vjezbe)
  
});
router.route('/korisnikovevjezbe').get(async(req, res) => {
  const token = dohvatiToken(req)
  const dekToken = jwt.verify(token, process.env.SECRET)
  const korisnik = await User.findById(dekToken.id)

  const vjezbe=await Exercise.find({username:korisnik.username}).populate('user')
  res.json(vjezbe);

});

router.route('/add').post(async(req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const token = dohvatiToken(req)
  const dekToken = jwt.verify(token, process.env.SECRET)
  if (!token || !dekToken.id){
    return res.status(401).json({error: 'neispravni ili nepostojeći token'})
  }
  const korisnik = await User.findById(dekToken.id)

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
    user:korisnik._id

  });
  const spremljenavjezba=await newExercise.save()
  korisnik.exercises=korisnik.exercises.concat(spremljenavjezba)
  await korisnik.save()

  res.json(spremljenavjezba)


});


router.route('/:id').get(async(req, res) => {
  const poruka=await Exercise.findById(req.params.id)
  if (poruka) {
    res.json(poruka)
  } else {
    res.status(404).end()
  }

  });
  
  router.route('/:id').delete(async(req, res) => {
    const id= req.params.id
    const token=dohvatiToken(req)
    const dekToken = jwt.verify(token, process.env.SECRET)
    const korisnik = await User.findById(dekToken.id)


    if(!token || !dekToken.id || !(korisnik.exercises.includes(id))){
      return res.status(401).send('401')
  
    }
    
    await Exercise.findByIdAndRemove(req.params.id)
  
    res.status(204).end() 
  });

  
  router.route('/update/:id').post(async(req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
//id je id vjezbe
    const id = req.params.id
   const token = dohvatiToken(req)
   const dekToken = jwt.verify(token, process.env.SECRET)
   const korisnik = await User.findById(dekToken.id)


  if(!token || !dekToken.id || !(korisnik.exercises.includes(id))){

    
    return res.status(401).json({error: 'Request failed with status code 401'})
  
    }
  const excercise={
    username,
    description,
    duration,
    date,
    user:korisnik._id

  }
  const novavjezba=await Exercise.findByIdAndUpdate(id,excercise,{new:true})
  res.json(novavjezba)
  });


module.exports=router

