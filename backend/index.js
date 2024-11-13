const express = require('express');
const cors = require('cors');  // Importar cors
const mainRoutes = require('./src/rutas/mainRoutes');

const app = express();
// Configurar CORS para aceptar cualquier origen
const corsOptions = {
  origin: '*',  // Asegura que cualquier origen esté permitido
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization','X-Requested-With'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', mainRoutes);




app.listen(5000, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto 5000`);
});