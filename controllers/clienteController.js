const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ===============================
// FUNÇÃO: Cadastrar um novo cliente
// ===============================
const cadastrarCliente = async (req, res) => {
  const { nome, email, telefone } = req.body;

  try {
    const clienteExistente = await prisma.user.findFirst({
      where: {
        OR: [
          { nome },
          { email },
          { telefone }
        ]
      }
    });

    if (clienteExistente) {
      return res.status(400).send("Cliente já cadastrado.");
    }

    await prisma.user.create({
      data: { nome, email, telefone }
    });

    res.status(201).send("Cliente cadastrado com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    res.status(500).send("Erro interno");
  }
};

// ===============================
// FUNÇÃO: Listar todos os clientes
// ===============================
const listarClientes = async (req, res) => {
  try {
    const clientes = await prisma.user.findMany();
    res.json(clientes);
  } catch (error) {
    console.error("Erro ao listar:", error);
    res.status(500).send("Erro interno");
  }
};

// ===============================
// FUNÇÃO: Excluir cliente por ID
// ===============================
const excluirCliente = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    res.send("Cliente excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir:", error);
    res.status(500).send("Erro interno");
  }
};

// ===============================
// FUNÇÃO: Atualizar cliente por ID
// ===============================
const atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;

  try {
    await prisma.user.update({
      where: { id: parseInt(id) },
      data: { nome, email, telefone }
    });

    res.send("Cliente atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    res.status(500).send("Erro interno");
  }
};

// ===============================
// FUNÇÃO: Atualizar status ativo/inativo
// ===============================
const atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await prisma.user.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    res.send("Status atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    res.status(500).send("Erro interno");
  }
};

// ===============================
// FUNÇÃO: Buscar cliente por Nome (like)
// ===============================
const buscarPorNome = async (req, res) => {
  const { nome } = req.params;

  try {
    const clientes = await prisma.user.findMany({
      where: {
        nome: {
          contains: nome,
          mode: "insensitive" // para buscar ignorando maiúscula/minúscula
        }
      }
    });

    res.json(clientes);
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    res.status(500).send("Erro interno");
  }
};

// ===============================
// FUNÇÃO: Buscar cliente por ID
// ===============================
const buscarPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!cliente) {
      return res.status(404).send("Cliente não encontrado");
    }

    res.json(cliente);
  } catch (error) {
    console.error("Erro ao buscar por ID:", error);
    res.status(500).send("Erro interno");
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
