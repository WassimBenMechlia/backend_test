const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');


exports.signUp = (req,res,next)=>{
   bcrypt.hash(req.body.password,10)
   .then(hash =>{
    const user = new User({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : hash
    });
    user.save()
      .then(() => res.status(201).json({ message: 'user created !' }))
      .catch(error => res.status(400).json(error));
   }
   )
   .catch(error => res.status(500).json({error : error.message}));
};

exports.signIn = (req,res,next)=>{
  User.findOne({email : req.body.email})
  .then(user =>{
    if(!user){
     return   res.status(404).json({ message: 'user not found '});
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
        if (!valid) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
        }
        res.status(200).json({
            id: user._id,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            token: token.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
          )
        });
    })
    .catch(error => res.status(500).json({ error :error.message}));
  })
  .catch(error => res.status(500).json({ error :error.message}));
};
exports.getAllUsers = (req, res, next) => {
  User.find({}, '_id name email')
      .then(users => {
          if (!users || users.length === 0) {
              return res.status(404).json({ message: 'No users found' });
          }
          res.status(200).json(users);
      })
      .catch(error => res.status(500).json({ error: error.message }));
};