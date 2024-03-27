const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

let taskItems = [];

// Endpoint para obtener la lista de tareas
app.get('/api/tasks', (_req, res) => {
  res.json(taskItems);
});

// Endpoint para agregar una nueva tarea
app.post('/api/tasks', (req, res) => {
  const newItem = req.body;
  taskItems.push(newItem);
  res.status(201).send('Task added successfully');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
