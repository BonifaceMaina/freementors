import express from 'express';
import authController from '../controllers/authController';
import signupValidation from '../middleware/signupValidation';
import signinValidation from '../middleware/signinValidation';
import checkUser from '../middleware/checkUser';

const authRoutes = express.Router();


authRoutes.post('/signup', signupValidation, checkUser.userExistsReg, authController.registerUser);

authRoutes.post('/signin', signinValidation, checkUser.userExistsLogin, authController.signinUser);

export default authRoutes;
