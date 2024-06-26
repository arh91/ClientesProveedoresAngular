const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); // Importar el módulo sqlite3
const { v4: uuidv4 } = require('uuid'); // Importar la función uuidv4 para generar IDs únicos

const app = express();
const port = 3000;
//const cors = require('cors');

//app.use(cors());

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
const db = new sqlite3.Database('empresa.db');


// Creamos la tabla "Clientes" si no existe
db.run(`CREATE TABLE IF NOT EXISTS Clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dni TEXT,
  nombre TEXT,
  direccion TEXT,
  telefono TEXT
)`);

// Creamos la tabla "Proveedores" si no existe
db.run(`CREATE TABLE IF NOT EXISTS Proveedores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dni TEXT,
  nombre TEXT,
  direccion TEXT,
  telefono TEXT
)`);


// Endpoint para agregar un nuevo cliente
app.post('/api/clientes', (req, res) => {
  const { dni, name, address, phone } = req.body;
  db.run('INSERT INTO Clientes (dni, nombre, direccion, telefono) VALUES (?, ?, ?, ?)', [dni, name, address, phone], (err) => {
    if (err) {
      console.error('Error al agregar cliente:', err);
      return res.status(500).json({ error: 'Error al agregar cliente' });
    }
    res.status(201).json({ message: 'Cliente agregado correctamente' });
  });
});

// Endpoint para agregar un nuevo proveedor
app.post('/api/proveedores', (req, res) => {
  const { dni, name, address, phone } = req.body;
  db.run('INSERT INTO Proveedores (dni, nombre, direccion, telefono) VALUES (?, ?, ?, ?)', [dni, name, address, phone], (err) => {
    if (err) {
      console.error('Error al agregar proveedor:', err);
      return res.status(500).json({ error: 'Error al agregar proveedor' });
    }
    res.status(201).json({ message: 'Proveedor agregado correctamente' });
  });
});


// Endpoint para obtener los códigos de todos los clientes
app.get('/api/clientes/codigos', (_req, res) => {
  db.all('SELECT id FROM Clientes', (err, rows) => {
    if (err) {
      console.error('Error al obtener códigos de clientes:', err);
      return res.status(500).json({ error: 'Error al obtener códigos de clientes' });
    }
    const codigos = rows.map(row => row.id);
    res.json({ codigos });
  });
});

// Endpoint para obtener los códigos de todos los proveedores
app.get('/api/proveedores/codigos', (_req, res) => {
  db.all('SELECT id FROM Proveedores', (err, rows) => {
    if (err) {
      console.error('Error al obtener códigos de proveedores:', err);
      return res.status(500).json({ error: 'Error al obtener códigos de proveedores' });
    }
    const codigos = rows.map(row => row.id);
    res.json({ codigos });
  });
});


// Endpoint para obtener un código de cliente por su dni
app.get('/api/clientes/codigos/:dni', (req, res) => {
  const clienteDni = req.params.dni;
  db.get('SELECT id FROM Clientes WHERE dni = ?', [clienteDni], (err, row) => {
    if (err) {
      console.error('Error al obtener datos del cliente:', err);
      return res.status(500).json({ error: 'Error al obtener datos del cliente' });
    }
    if (!row) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(row);
  });
});

// Endpoint para obtener un código de proveedor por su dni
app.get('/api/proveedores/codigos/:dni', (req, res) => {
  const proveedorDni = req.params.dni;
  db.get('SELECT id FROM Proveedores WHERE dni = ?', [proveedorDni], (err, row) => {
    if (err) {
      console.error('Error al obtener datos del proveedor:', err);
      return res.status(500).json({ error: 'Error al obtener datos del proveedor' });
    }
    if (!row) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    res.json(row);
  });
});


// Endpoint para obtener los datos de un cliente por su id
app.get('/api/clientes/:id', (req, res) => {
  const clienteId = req.params.id;
  db.get('SELECT * FROM Clientes WHERE id = ?', [clienteId], (err, row) => {
    if (err) {
      console.error('Error al obtener datos del cliente:', err);
      return res.status(500).json({ error: 'Error al obtener datos del cliente' });
    }
    if (!row) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(row);
  });
});

// Endpoint para obtener los datos de un proveedor por su id
app.get('/api/proveedores/:id', (req, res) => {
  const proveedorId = req.params.id;
  db.get('SELECT * FROM Proveedores WHERE id = ?', [proveedorId], (err, row) => {
    if (err) {
      console.error('Error al obtener datos del proveedor:', err);
      return res.status(500).json({ error: 'Error al obtener datos del proveedor' });
    }
    if (!row) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    res.json(row);
  });
});


//Endpoint para verificar si existe en la base de datos el dni de cliente que le pasamos
app.get('/api/clientes/existe/:dni', (req, res) => {
  console.log("endpoint checkdniexistence customers");
  const dni = req.params.dni;
  db.get('SELECT COUNT(*) AS count FROM Clientes WHERE dni = ?', [dni], (err, row) => {
    if (err) {
      console.error('Error al verificar la existencia del DNI:', err);
      return res.status(500).json({ error: 'Error al verificar la existencia del DNI' });
    }
    const exists = row && row.count > 0;
    res.json({ exists });
    console.log(row);
    console.log(exists);
  });
});

//Endpoint para verificar si existe en la base de datos el dni de proveedor que le pasamos
app.get('/api/proveedores/existe/:dni', (req, res) => {
  console.log("endpoint checkdniexistence suppliers");
  const dni = req.params.dni;
  db.get('SELECT COUNT(*) AS count FROM Proveedores WHERE dni = ?', [dni], (err, row) => {
    if (err) {
      console.error('Error al verificar la existencia del DNI:', err);
      return res.status(500).json({ error: 'Error al verificar la existencia del DNI' });
    }
    const exists = row && row.count > 0;
    console.log(row);
    console.log(exists);
    res.json({ exists });
  });
});


//Endpoint para eliminar un cliente por su id
app.delete('/api/clientes/:id', (req, res) => {
  const clienteId = req.params.id;
  //Abrimos conexión con la base de datos
  //const db = new sqlite3.Database('empresa.db');
  //Eliminamos registro con el id dado
  db.run('DELETE FROM Clientes WHERE id = ?', [clienteId], (err) => {
    if (err) {
      console.error('Error al eliminar el cliente de la base de datos:', err);
      return res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
    res.status(200).json({ message: 'Cliente eliminado correctamente' });
  });
  // Actualizamos los IDs restantes
  /*db.run('UPDATE Clientes SET id = id - 1 WHERE id > ?', [clienteId], (err) => {
    if (err) {
      console.error('Error al actualizar los IDs:', err);
      res.status(500).json({ error: 'Error al actualizar los IDs' });
      return;
    }
    console.log('IDs actualizados correctamente');
    res.status(200).json({ message: 'IDs actualizados correctamente' });
  });
  // Cerramos conexión con la base de datos
  db.close();*/
});

//Endpoint para eliminar un proveedor por su id
app.delete('/api/proveedores/:id', (req, res) => {
  const proveedorId = req.params.id;
  db.run('DELETE FROM Proveedores WHERE id = ?', [proveedorId], (err) => {
    if (err) {
      console.error('Error al eliminar el proveedor de la base de datos:', err);
      return res.status(500).json({ error: 'Error al eliminar el proveedor' });
    }
    res.status(200).json({ message: 'Proveedor eliminado correctamente' });
  });
});


// Endpoint para eliminar todos los registros de la tabla Clientes
app.delete('/api/clientes', (_req, res) => {
  db.run('DELETE FROM Clientes', (err) => {
    if (err) {
      console.error('Error al eliminar clientes:', err);
      return res.status(500).json({ error: 'Error al eliminar clientes' });
    }
    // Reiniciar el contador de IDs
    db.run('DELETE FROM sqlite_sequence WHERE name = ?', ['Clientes'], (err2) => {
      if (err2) {
        console.error('Error al reiniciar el contador de IDs:', err2);
        return res.status(500).json({ error: 'Error al reiniciar el contador de IDs' });
      }
    res.status(200).json({ message: 'Todos los clientes han sido eliminados' });
    }); 
  });
});

// Endpoint para eliminar todos los registros de la tabla Proveedores
app.delete('/api/proveedores', (_req, res) => {
  db.run('DELETE FROM Proveedores', (err) => {
    if (err) {
      console.error('Error al eliminar proveedores:', err);
      return res.status(500).json({ error: 'Error al eliminar proveedores' });
    }
    // Reiniciar el contador de IDs
    db.run('DELETE FROM sqlite_sequence WHERE name = ?', ['Proveedores'], (err2) => {
      if (err2) {
        console.error('Error al reiniciar el contador de IDs:', err2);
        return res.status(500).json({ error: 'Error al reiniciar el contador de IDs' });
      }
    res.status(200).json({ message: 'Todos los proveedores han sido eliminados' });
    }); 
  });
});


//Endpoint para actualizar datos de un cliente con un id determinado
app.put('/api/clientes/:id', (req, res) => {
  const clienteId = req.params.id;
  const { dni, nombre, direccion, telefono } = req.body;
  db.run(
    'UPDATE Clientes SET dni = ?, nombre = ?, direccion = ?, telefono = ? WHERE id = ?',
    [dni, nombre, direccion, telefono, clienteId],
    (err) => {
      if (err) {
        console.error('Error al actualizar el cliente en la base de datos:', err);
        return res.status(500).json({ error: 'Error al actualizar el cliente' });
      }
      res.status(200).json({ message: 'Cliente actualizado correctamente' });
    }
  );
});

//Endpoint para actualizar datos de un proveedor con un id determinado
app.put('/api/proveedores/:id', (req, res) => {
  const proveedorId = req.params.id;
  const { dni, nombre, direccion, telefono } = req.body;
  db.run(
    'UPDATE Proveedores SET dni = ?, nombre = ?, direccion = ?, telefono = ? WHERE id = ?',
    [dni, nombre, direccion, telefono, proveedorId],
    (err) => {
      if (err) {
        console.error('Error al actualizar el proveedor en la base de datos:', err);
        return res.status(500).json({ error: 'Error al actualizar el proveedor' });
      }
      res.status(200).json({ message: 'Proveedor actualizado correctamente' });
    }
  );
});


//Actualiza ids de clientes tras operaciones de borrado
app.put('/api/clientes/updateids/:deletedid', (req, res) => {
  const deletedId = req.params.deletedid;
  db.run('UPDATE Clientes SET id = id - 1 WHERE id > ?', [deletedId], (err) => {
    if (err) {
      console.error('Error al actualizar los IDs:', err);
      res.status(500).json({ error: 'Error al actualizar los IDs' });
      return;
    }
    console.log('IDs actualizados correctamente');
    res.status(200).json({ message: 'IDs actualizados correctamente' });
  });
});

//Actualiza ids de proveedores tras operaciones de borrado
app.put('/api/proveedores/updateids/:deletedid', (req, res) => {
  const deletedId = req.params.deletedid;
  db.run('UPDATE Proveedores SET id = id - 1 WHERE id > ?', [deletedId], (err) => {
    if (err) {
      console.error('Error al actualizar los IDs:', err);
      res.status(500).json({ error: 'Error al actualizar los IDs' });
      return;
    }
    console.log('IDs actualizados correctamente');
    res.status(200).json({ message: 'IDs actualizados correctamente' });
  });
});


app.listen(port, () => {
  console.log(`Servidor activo en el puerto ${port}`);
});
