const express=require('express')
const cors=require('cors')
const mongoose = require('mongoose')


require('dotenv').config();

const app=express()
const port=process.env.PORT || 5000
//midlever
app.use(cors())
//server is sending and receving json
app.use(express.json())
const password=process.env.PASSWORD
const ime_baze=process.env.NODE_ENV === 'test'
? 'PROJEKT-TEST'
:'PROJEKT'
const DB_URI=`mongodb://ivanaradalj-okviri:${password}@cluster0-shard-00-00.vqn5c.mongodb.net:27017,cluster0-shard-00-01.vqn5c.mongodb.net:27017,cluster0-shard-00-02.vqn5c.mongodb.net:27017/${ime_baze}?ssl=true&replicaSet=atlas-vwst3l-shard-0&authSource=admin&retryWrites=true&w=majority`
const uri=process.env.ATLAS_URI
//updates to mongo sb(usenewuriparses i usecreateindex)
mongoose.connect(DB_URI,{useNewUrlParser:true,useCreateIndex:true})
const connection=mongoose.connection
connection.once('open',()=>{
    console.log("mongoDb database connection established successfully")
})
const excercisesRouter=require('./routes/exercises')
const usersRouter=require('./routes/users')
const loginRouter=require('./routes/login')
app.use('/exercises',excercisesRouter)
app.use('/users',usersRouter)
app.use('/login',loginRouter)


app.listen(port,()=>{
    console.log(`server is running on port:${port} `)
})

module.exports = app