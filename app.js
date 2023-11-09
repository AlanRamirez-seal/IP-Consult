const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const axios = require('axios');
const myConnection = require('express-myconnection');
const ejs = require('ejs');
const db = require('./models/db');

const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

// Configuración de MySQL
const dbOptions = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'iplocator',
};

// Middleware para MySQL
app.use(myConnection(mysql, dbOptions, 'single'));

// Configuración de EJS
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Rutas
app.post('/consultar-ip-form', async (req, res) => {
  try {
    const ip = req.body.ip;

    // Verificar si la IP ya está registrada
    const isIpRegistered = await isIPRegistered(ip);

    if (isIpRegistered) {
      // Renderizar la vista con la alerta de IP ya registrada
      res.render('ip-registrada', { ip });
    } else {
      // Obtener información de la API
      const apiResponse = await axios.get(`https://ipinfo.io/${ip}?token=c64447b23a1da2`);

      // Almacenar la búsqueda en la base de datos
      const result = await insertSearch(ip, JSON.stringify(apiResponse.data));

      // Renderizar la vista con los resultados
      res.render('resultados', { ip, data: apiResponse.data });
    }
  } catch (error) {
    console.error(error);
    res.render('error', { error: 'La IP ya esta registrada' });
    alert("¡Mensaje de alerta...!");
  }
});

// Función para verificar si la IP ya está registrada
const isIPRegistered = (ip) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) as count FROM searches WHERE ip = ?';
    db.query(query, [ip], (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(result[0].count > 0);
      }
    });
  });
};

// Función para insertar búsqueda en la base de datos
const insertSearch = (ip, data) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO searches (ip, data) VALUES (?, ?)';
    db.query(query, [ip, data], (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Incluir estas líneas para manejar solicitudes desde el formulario
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.render('index');
});

// Agrega esta ruta en tu archivo app.js
app.get('/mostrar-registros', async (req, res) => {
  try {
    // Obtener todos los registros de la base de datos
    const registros = await getAllRecords();

    // Renderizar la vista con la tabla de resultados
    res.render('mostrar-registros', { registros });
  } catch (error) {
    console.error(error);
    res.render('error', { error: 'Error al mostrar los registros' });
  }
});

const getAllRecords = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM searches';
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Agrega esta ruta para manejar las solicitudes de eliminación
app.post('/eliminar-registro/:id', async (req, res) => {
  const id = req.params.id;

  // Lógica para eliminar el registro con el ID proporcionado
  try {
    const result = await deleteRecord(id);
    res.redirect('/mostrar-registros'); // Redirige de vuelta a la página de mostrar registros
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el registro');
  }
});

// Función para eliminar un registro por ID
const deleteRecord = (id) => {
  return new Promise((resolve, reject) => {
    // Convertir id a entero
    const parsedId = parseInt(id);

    const query = 'DELETE FROM searches WHERE id = ?';
    db.query(query, [parsedId], (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
app.get('/buscar-registro', async (req, res) => {
    try {
        const ipBusqueda = req.query.ipBusqueda;

        if (ipBusqueda) {
            // Obtener registros con la IP específica
            const registros = await getRecordsByIP(ipBusqueda);

            // Renderizar la vista con los resultados de la búsqueda
            res.render('mostrar-registros', { registros });
        } else {
            // Si no se proporciona una IP, redirigir a la página principal
            res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        res.render('error', { error: 'Error al buscar registros' });
    }
});

// Función para obtener registros por IP
const getRecordsByIP = (ip) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM searches WHERE ip = ?';
        db.query(query, [ip], (err, results) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};
