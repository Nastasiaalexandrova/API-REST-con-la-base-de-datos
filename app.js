// app.js
const express = require('express');
const app = express();
const eoiRoutes = require('./eoi'); // Importa las rutas
const PORT = 3000;

app.use(express.static('public'));

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use('/api/eoi', eoiRoutes);

// Ruta para error 404 (cualquier ruta no definida)
app.use((req, res) => {
  res.status(404).send('404 - Ruta no encontrada');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
