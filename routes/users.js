const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.post('/signup',userController.signUp);
router.post('/signin',userController.signIn);
router.get('/getUsers',userController.getAllUsers);




module.exports = router;