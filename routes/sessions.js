const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('view all created sessions/ view all requested sessions');
});

router.post('/', (req, res) => {
    res.send('create mentorship session request');
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
