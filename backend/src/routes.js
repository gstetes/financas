const express = require('express');
const router = express.Router();

const userController = require('./controllers/usersController');

router.post('/users/create', userController.create);

module.exports = router;