const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.send('signup');
});

router.post('/signup', (req, res) => {
    res.send('signup');
});

router.post('/signin', (req, res) => {
    res.send('sign in');
});

module.exports = router;