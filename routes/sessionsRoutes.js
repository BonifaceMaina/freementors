import usersController from '../controllers/usersController';
import userAuth from '../middleware/userAuth';
import express from 'express';
let router = express.Router();


router.post('/', userAuth, usersController.createSession);

router.get('/', userAuth, usersController.viewAllSessions);

router.patch('/:sessionId/accept', userAuth, usersController.acceptSession);

router.patch('/:sessionId/reject', userAuth, usersController.rejectSession);

router.post('/:sessionId/review', userAuth, usersController.createSessionReview);

router.delete('/:sessionId/review', userAuth, usersController.adminDeleteReview);

export default router;