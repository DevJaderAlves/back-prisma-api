const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos
exports.listarClientes = async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar clientes' });
  }
};

// Buscar por ID
exports.buscarPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await prisma.cliente.findUnique({ where: { id: Number(id) } });
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
};

// Cadastrar
exports.cadastrarCliente = async (req, res) => {
  const { nome, email, telefone, status } = req.body;
  try {
    const cliente = await prisma.cliente.create({
      data: { nome, email, telefone, status }
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar cliente' });
  }
};

// Atualizar status
exports.atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const cliente = await prisma.cliente.update({
      where: { id: Number(id) },
      data: { status }
    });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
};

// Atualizar dados
exports.atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;
  try {
    const cliente = await prisma.cliente.update({
      where: { id: Number(id) },
      data: { nome, email, telefone }
    });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
};

// Excluir cliente
exports.excluirCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cliente.delete({ where: { id: Number(id) } });
    res.json({ mensagem: 'Cliente excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir cliente' });
  }
};

// Buscar por nome
exports.buscarPorNome = async (req, res) => {
  const { nome } = req.params;
  try {
    const clientes = await prisma.cliente.findMany({
      where: {
        nome: { contains: nome, mode: 'insensitive' }
      }
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar por nome' });
  }
};


module.exports = {
  cadastrarCliente,
  listarClientes,
  excluirCliente,
  atualizarCliente,
  atualizarStatus,
  buscarPorNome,
  buscarPorId
};
