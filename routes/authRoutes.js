import express from 'express';
import authController from '../controllers/authController';
import signupValidation from '../middleware/signupValidation';
import signinValidation from '../middleware/signinValidation';
const router = express.Router();


router.post('/signup',signupValidation, authController.registerUser);

router.post('/signin', signinValidation, authController.signinUser);

export default router;