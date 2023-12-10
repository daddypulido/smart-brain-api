const express = require('express');
const bodyParser = require('body-parser');
const bcrypt =require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'alex',
      password : '',
      database : 'smart-brain'
    }
  });
  db.select('*').from('users').then(data=>{
    console.log(data);
  })

const app = express();

app.use(bodyParser.json());
app.use(cors())




app.post('/signin',(req,res)=>{signIn.handleLogIn(req,res,db,bcrypt)}) 
   


app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})


app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

app.listen(3001,()=>{
    console.log('App is running in port 3001')
})


//  ---> res = this is working

// sign in route --> POST = success/fail

// register --> POST = NEW USER

// Profile --> GET = USER 

// Image  --> PUT = user new object

