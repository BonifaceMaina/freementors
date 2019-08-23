const usersController =require('../controllers/usersController');
const express = require('express');
let router = express.Router();
const userAuth = require('../middleware/userAuth');


router.get('/', userAuth, usersController.viewAllMentors);    

router.get('/:mentorId', userAuth, usersController.viewOneMentor);

module.exports = router;