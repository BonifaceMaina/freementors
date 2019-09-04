import usersController from '../controllers/usersController';
import userAuth from '../middleware/userAuth';
import express from 'express';
let router = express.Router();


router.get('/', userAuth, usersController.viewAllMentors);    

router.get('/:mentorId', userAuth, usersController.viewOneMentor);

export default router;