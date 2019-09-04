const usersController =require('../controllers/usersController');
const userAuth = require('../middleware/userAuth');
const express = require('express');
let router = express.Router();


router.get('/', userAuth, usersController.viewAllMentors);    

router.get('/:mentorId', userAuth, usersController.viewOneMentor);

module.exports = router;