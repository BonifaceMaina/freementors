import express from 'express';
import usersController from '../controllers/usersController';
import userAuth from '../middleware/userAuth';
import sessionsValidate from '../middleware/sessionsValidate';

const sessions = express.Router();


sessions.post('/', userAuth, sessionsValidate.createSession, usersController.createSession);

sessions.get('/', userAuth, sessionsValidate.viewAllSessions, usersController.viewAllSessions);

sessions.patch('/:sessionId/accept', userAuth, sessionsValidate.acceptSession, usersController.acceptSession);

sessions.patch('/:sessionId/reject', userAuth, sessionsValidate.rejectSession, usersController.rejectSession);

sessions.post('/:sessionId/review', userAuth, sessionsValidate.createSessionReview, usersController.createSessionReview);

sessions.delete('/:sessionId/review', userAuth, sessionsValidate.adminDeleteReview, usersController.adminDeleteReview);

export default sessions;
