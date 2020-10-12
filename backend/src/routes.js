const express = require('express');
const router = express.Router();

const userController = require('./controllers/usersController');

router.get('/users', userController.list);
router.post('/users/create', userController.create);
router.put('/users/update', userController.update);
router.delete('/users/delete', userController.delete);

module.exports = router;