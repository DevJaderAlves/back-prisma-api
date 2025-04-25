const express = require("express");
const cors = require("cors");
const clienteRoutes = require('./routes/clientes');

const app = express();

app.use(cors());
app.use(express.json());

// Aplicando as rotas corretas
app.use('/clientes', clienteRoutes);

// Sobe o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});



