import express from 'express';
import adminController from '../controllers/adminController';
import userAuth from '../middleware/userAuth';
import adminValidation from '../middleware/adminValidation';

const adminRoute = express.Router();

adminRoute.patch('/:userId', userAuth, adminValidation.checkUserToUpgrade, adminController.upgradeUser);

export default adminRoute;
