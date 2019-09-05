import express from 'express';
import usersController from '../controllers/usersController';
import userAuth from '../middleware/userAuth';

const mentorRoutes = express.Router();


mentorRoutes.get('/', userAuth, usersController.viewAllMentors);

mentorRoutes.get('/:mentorId', userAuth, usersController.viewOneMentor);

export default mentorRoutes;
