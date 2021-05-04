const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
const router = require('express').Router();
const User = require('../models/user.model')
//login
router.route('/add').post(async(req, res) => {

    const podaci=req.body

    const korisnik=await User.findOne({username:podaci.username})

    const passDobar = korisnik === null
  ? false
  : await bcrypt.compare(podaci.pass, korisnik.passHash)

  if(!(korisnik && passDobar)){
    return res.status(401).json({
      error: 'neispravni korisnik ili lozinka'
    })
  }

  const userToken = {
    username : korisnik.username,
    id: korisnik._id
  }
  const token = jwt.sign(userToken, process.env.SECRET)
  res.status(200).send({
    token, username: korisnik.username
  })

  });


  module.exports=router
