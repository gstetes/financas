const express = require('express');
const router = express.Router();

const userController = require('./controllers/usersController');
const movimentController = require('./controllers/movimentController');

//Rotas de usuário
router.get('/users', userController.list);
router.post('/users/create', userController.create);
router.put('/users/update', userController.update);
router.delete('/users/delete', userController.delete);

//Rotas de movimentação
router.post('/moviment/in', movimentController.in);
router.post('/moviment/out', movimentController.out);
router.get('/moviment', movimentController.list);

module.exports = router;