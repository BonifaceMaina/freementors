const usersController = require('../controllers/usersController');
const userAuth = require('../middleware/userAuth');
const express = require('express');
let router = express.Router();


router.post('/', userAuth, usersController.createSession);

router.get('/', (req, res) => {
    res.send('view all created sessions/ view all requested sessions');
});

router.patch('/:sessionId/accept', (req, res) => {
    res.send('mentor accept session request');
});

router.patch('/:sessionId/reject', (req, res) => {
    res.send('mentor accept session request');
});

router.post('/:sessionId/review', (req, res) => {
    res.send('review mentor after mentorship session');
});

router.delete('/:sessionId/review/delete', (req, res) => {
    res.send('admin can delete a session review');
});

module.exports = router;