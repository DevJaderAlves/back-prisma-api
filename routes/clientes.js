const express = require('express');
const router = express.Router();
const controller = require('../controllers/clienteController');

router.get('/', controller.listarClientes);
router.post('/', controller.cadastrarCliente);
router.delete('/:id', controller.excluirCliente);
router.patch('/:id/status', controller.atualizarStatus);

module.exports = router;


