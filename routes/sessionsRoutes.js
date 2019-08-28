const usersController = require('../controllers/usersController');
const userAuth = require('../middleware/userAuth');
const express = require('express');
let router = express.Router();


router.post('/', userAuth, usersController.createSession);

router.get('/', userAuth, usersController.viewAllSessions);

router.patch('/:sessionId/accept', userAuth, usersController.acceptSession);

router.patch('/:sessionId/reject', userAuth, usersController.rejectSession);

router.post('/:sessionId/review', userAuth, usersController.createSessionReview);

router.delete('/:sessionId/review/delete', (req, res) => {
    res.send('admin can delete a session review');
});

module.exports = router;