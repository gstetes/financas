const express = require('express');
const router = express.Router();

const userController = require('./controllers/usersController');
const movimentController = require('./controllers/movimentController');
const sessionController = require('./controllers/sessionController');

const authMiddleware = require('./middlewares/authMiddleware')

//Rotas de usuário
router.get('/users', userController.list);
router.post('/users/create', userController.create);
router.put('/users/update', userController.update);
router.delete('/users/delete', userController.delete);

//Rotas de movimentação
router.post('/moviment/in', authMiddleware, movimentController.in);
router.post('/moviment/out', authMiddleware, movimentController.out);
router.get('/moviments', authMiddleware, movimentController.search);

// router.get('/moviment', movimentController.list);

//Rotas de Sessão
router.post('/session/create', sessionController.create);

module.exports = router;