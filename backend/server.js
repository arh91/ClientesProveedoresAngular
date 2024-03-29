const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); // Importar el módulo sqlite3
const { v4: uuidv4 } = require('uuid'); // Importar la función uuidv4 para generar IDs únicos

const app = express();
const port = 3000;

// Middleware para permitir solicitudes desde el cliente Angular (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
}); 

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Conectar a la base de datos SQLite (si no existe, se creará automáticamente)
const db = new sqlite3.Database('lista_de_tareas.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, task TEXT, completed INTEGER)');
});

//Endpoint para obtener la lista de tareas
app.get('/api/tasks', (_req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      console.error('Error al obtener las tareas de la base de datos:', err);
      return res.status(500).json({ error: 'Error al obtener las tareas' });
    }
    res.json(rows);
  });
});

//Endpoint para agregar una nueva tarea
app.post('/api/tasks', (req, res) => {
  const { task, completed } = req.body;
  const taskId = uuidv4(); // Generar un ID único utilizando uuid
  db.run('INSERT INTO tasks (id, task, completed) VALUES (?, ?, ?)', [taskId, task, completed], function (err) {
    if (err) {
      console.error('Error al agregar la tarea a la base de datos:', err);
      return res.status(500).json({ error: 'Error al agregar la tarea' });
    }
    res.status(201).json({ id: taskId, task, completed });
  });
});

// Endpoint para actualizar una tarea por su ID
app.put('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { task, completed } = req.body;
  db.run('UPDATE tasks SET task = ?, completed = ? WHERE id = ?', [task, completed, taskId], (err) => {
    if (err) {
      console.error('Error al actualizar la tarea en la base de datos:', err);
      return res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
    res.status(200).json({ id: taskId, task, completed });
  });
});

// Endpoint para eliminar una tarea por su ID
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  db.run('DELETE FROM tasks WHERE id = ?', [taskId], (err) => {
    if (err) {
      console.error('Error al eliminar la tarea de la base de datos:', err);
      return res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  });
});

app.listen(port, () => {
  console.log(`Servidor activo en el puerto ${port}`);
});
