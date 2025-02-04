const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// POST /users/register
router.post('/register', userController.register);

// POST /users/login
router.post('/login', userController.login);

module.exports = router;
