const router=require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const User=require('../models/user.model')

router.route('/').get((req,res)=>{
    User.find()
    .then(users=>res.json(users))
    .catch(err=>res.status(400).json('Error: ' + err))
})
//registracija
router.route('/add').post(async(req, res) => {
    const sadrzaj = req.body;
    const korisnik=await User.findOne({username:sadrzaj.username})
    if(!korisnik){
      const runde=10
      const passHash=await bcrypt.hash(sadrzaj.pass,runde)
    
      const newUser = new User({username:sadrzaj.username
        ,passHash});
    
      const spremKorisnik=await newUser.save()
      const userToken = {
        username : spremKorisnik.username,
        id: spremKorisnik.id
      }
      const token = jwt.sign(userToken, process.env.SECRET)
      res.status(200).send({
        token, username: sadrzaj.username
      })

    }else{
      return res.status(401).json({
        error: 'Request failed with status code 401'
      })
    }
  


     

  });
  
module.exports=router