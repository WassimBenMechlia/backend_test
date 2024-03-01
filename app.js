const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user_model');
const userRoutes = require('./routes/users');
const passport = require('passport');
const session = require('express-session');
require('./user_auth');

mongoose.connect('mongodb+srv://wassim:ctr-2222@cluster0.vymf0rq.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/user',userRoutes);

function isLoggedIn(req,res,next){
  req.user ? next() : res.sendStatus(401);
  
}
app.use(session({
  secret: 'keyboard cat',
  
}));
app.use(passport.initialize());
app.use(passport.session());



app.get('/',(req,res)=>{
  res.send('<a href="/auth/google"> auth with google');
});
app.get('/auth/google', passport.authenticate('google',{scope : ['profile'] }));
app.get('/google/callback',passport.authenticate('google',{
  successRedirect :'/protected',
  failureRedirect : '/auth/failure',
}));
app.get('/auth/failure',(req,res)=>{
  res.send('something went wrong');
});
app.get('/protected',isLoggedIn,(req,res)=>{
  res.send(`hello ${req.user.displayName}`);
});



module.exports = app;