const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const getData = require('./controllers/getData');

const PORT = process.env.PORT || 3001

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });

app.use(bodyParser.json());

app.use(cors());

// app.get('/', (req, res) => res.json('it is working'))
app.post('/', (req,res) => getData.getUser(req, res, db))
app.post('/signin', (req,res) => signin.handleSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister (req, res, db, bcrypt))
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req,res,db))
app.put('/image', (req,res) => image.handleImage(req,res,db))
app.post('/imageurl', (req,res) => image.handleApiCall(req,res))

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})