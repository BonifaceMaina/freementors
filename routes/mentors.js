const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('all mentors');
});

router.get('/:mentorId', (req, res) => {
    res.send('view one mentor');
});

module.exports = router;