const express = require('express');
const router = express.Router();
const controller = require('../controllers/clienteController');

// Rota para cadastrar cliente
router.post('/', controller.cadastrarCliente);

// Rota para listar todos os clientes
router.get('/', controller.listarClientes);

// Rota para buscar cliente por nome
router.get('/buscar/:nome', controller.buscarPorNome);

// Rota para buscar cliente por ID
router.get('/:id', controller.buscarPorId);

// Rota para atualizar cliente
router.put('/:id', controller.atualizarCliente);

// Rota para atualizar status do cliente (ativo/inativo)
router.patch('/:id/status', controller.atualizarStatus);

// Rota para excluir cliente
router.delete('/:id', controller.excluirCliente);

module.exports = router;

