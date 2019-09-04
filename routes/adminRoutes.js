const adminController = require('../controllers/adminController');
const userAuth = require('../middleware/userAuth');
const express = require('express');
let router = express.Router();

router.patch('/:userId', userAuth, adminController.upgradeUser);

module.exports = router;