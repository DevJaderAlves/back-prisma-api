const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os clientes
const listarClientes = async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar clientes' });
  }
};

// Cadastrar novo cliente
const cadastrarCliente = async (req, res) => {
  const { nome, email, telefone, status } = req.body;
  try {
    const novoCliente = await prisma.cliente.create({
      data: { nome, email, telefone, status },
    });
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar cliente' });
  }
};

// Excluir cliente
const excluirCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cliente.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir cliente' });
  }
};

// Atualizar status do cliente
const atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await prisma.cliente.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.status(200).json({ message: 'Status atualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
};

async function buscarPorNome(req, res) {
  const nome = req.params.nome;
  try {
    const clientes = await prisma.cliente.findMany({
      where: {
        nome: {
          contains: nome,
          mode: 'insensitive'
        }
      }
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar cliente por nome" });
  }
}

async function buscarPorId(req, res) {
  const { id } = req.params;
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: parseInt(id) }
    });

    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar cliente por ID" });
  }
}

async function atualizarCliente(req, res) {
  const { id } = req.params;
  const { nome, email, telefone, status } = req.body;

  try {
    const clienteAtualizado = await prisma.cliente.update({
      where: { id: Number(id) },
      data: { nome, email, telefone, status }
    });

    res.json(clienteAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).send('Erro ao atualizar cliente');
  }
}



module.exports = {
  listarClientes,
  cadastrarCliente,
  excluirCliente,
  atualizarStatus,
  buscarPorNome,
  buscarPorId,
  atualizarCliente
};

