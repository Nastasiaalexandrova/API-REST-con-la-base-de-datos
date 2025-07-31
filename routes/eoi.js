const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'EOI'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

router.get('/', (req, res) => {
  connection.query('SELECT * FROM cursos', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get('/year/:anyo', (req, res) => {
  const { anyo } = req.params;
  connection.query('SELECT * FROM cursos WHERE Any = ?', [anyo], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get('/year/:anyo/type/:tipus', (req, res) => {
  const { anyo, tipus } = req.params;
  connection.query('SELECT * FROM cursos WHERE Any = ? AND Tipus = ?', [anyo, tipus], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get('/lang/:idioma', (req, res) => {
  const { idioma } = req.params;
  const query = `
    SELECT cursos.*
    FROM cursos
    JOIN idiomes ON cursos.id_idioma = idiomes.id_idioma
    WHERE LOWER(idiomes.nom_idioma) = ? OR LOWER(idiomes.nombre_idioma) = ?
  `;
  connection.query(query, [idioma.toLowerCase(), idioma.toLowerCase()], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;
