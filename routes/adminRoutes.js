import adminController from '../controllers/adminController';
import userAuth from '../middleware/userAuth';
import express from 'express';
const router = express.Router();

router.patch('/:userId', userAuth, adminController.upgradeUser);

export default router;