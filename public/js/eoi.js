// // eoi.js
// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql2');

// // Configuración de conexión a la base de datos
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',       // Ajusta tu contraseña si la tienes
//   database: 'EOI'
// });

// // Conexión a la base de datos
// connection.connect(err => {
//   if (err) throw err;
//   console.log('Conectado a la base de datos MySQL');
// });

// /**
//  * Ruta: /api/eoi
//  * Descripción: Devuelve todos los cursos
//  */
// router.get('/', (req, res) => {
//   const query = 'SELECT * FROM cursos';
//   connection.query(query, (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// /**
//  * Ruta: /api/eoi/year/:anyo
//  * Descripción: Devuelve cursos de un año específico
//  */
// router.get('/year/:anyo', (req, res) => {
//   const { anyo } = req.params;
//   const query = 'SELECT * FROM cursos WHERE Any = ?';
//   connection.query(query, [anyo], (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// /**
//  * Ruta: /api/eoi/year/:anyo/type/:tipus
//  * Descripción: Devuelve cursos por año y tipo
//  */
// router.get('/year/:anyo/type/:tipus', (req, res) => {
//   const { anyo, tipus } = req.params;
//   const query = 'SELECT * FROM cursos WHERE Any = ? AND Tipus = ?';
//   connection.query(query, [anyo, tipus], (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// /**
//  * Ruta: /api/eoi/lang/:idioma
//  * Descripción: Devuelve cursos por nombre de idioma (en catalán o castellano)
//  */
// router.get('/lang/:idioma', (req, res) => {
//   const { idioma } = req.params;
//   const query = `
//     SELECT cursos.*
//     FROM cursos
//     JOIN idiomes ON cursos.id_idioma = idiomes.id_idioma
//     WHERE LOWER(idiomes.nom_idioma) = ? OR LOWER(idiomes.nombre_idioma) = ?
//   `;
//   connection.query(query, [idioma.toLowerCase(), idioma.toLowerCase()], (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// module.exports = router;



document.addEventListener('DOMContentLoaded', () => {
    // Año
    document.getElementById('formAny').addEventListener('submit', (e) => {
      e.preventDefault();
      const anyo = document.getElementById('anyo').value;
      if (anyo) {
        window.open(`/api/eoi/year/${anyo}`, '_blank');
      }
    });
  
    // Año + Tipo
    document.getElementById('formAnyTipus').addEventListener('submit', (e) => {
      e.preventDefault();
      const anyo = document.getElementById('anyo2').value;
      const tipus = document.getElementById('tipus').value;
      if (anyo && tipus) {
        window.open(`/api/eoi/year/${anyo}/type/${tipus}`, '_blank');
      }
    });
  
    // Idioma
    document.getElementById('formIdioma').addEventListener('submit', (e) => {
      e.preventDefault();
      const idioma = document.getElementById('idioma').value;
      if (idioma) {
        window.open(`/api/eoi/lang/${idioma}`, '_blank');
      }
    });
  });
  