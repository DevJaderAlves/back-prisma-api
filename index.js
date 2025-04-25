const express = require('express');
const cors = require('cors');
const app = express();

const clienteRoutes = require('./routes/clientes');

app.use(cors());
app.use(express.json());
app.use('/clientes', clienteRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});




