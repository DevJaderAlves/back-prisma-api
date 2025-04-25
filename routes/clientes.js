const express = require('express');
const router = express.Router();
const controller = require('../controllers/clienteController');

router.get('/', controller.listarClientes);
router.get('/buscar/:nome', controller.buscarPorNome);
router.get('/:id', controller.buscarPorId);
router.post('/', controller.cadastrarCliente);
router.delete('/:id', controller.excluirCliente);
router.patch('/:id/status', controller.atualizarStatus);
router.put('/:id', controller.atualizarCliente);

module.exports = router;


