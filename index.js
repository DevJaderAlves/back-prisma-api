const express = require("express");
const cors = require("cors");
const clienteRoutes = require('./routes/clientes');

const app = express();

app.use('/clientes', clienteRoutes);

app.use(cors());
app.use(express.json());

app.get('/clientes', async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
  } catch (error) {
    console.error("Erro detalhado:", error); // exibe erro no console do Render
    res.status(500).json({ error: 'Erro ao listar clientes' });
  }
});

app.post('/clientes', async (req, res) => {
  try {
    const { nome, email, telefone, status } = req.body;
    const novoCliente = await prisma.cliente.create({
      data: { nome, email, telefone, status }
    });
    res.json(novoCliente);
  } catch (error) {
    console.error(error); // ajuda no debug
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


