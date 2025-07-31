// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   multipleStatements: true // ⚠️ necesario para ejecutar varios comandos
// });

// // SQL para crear la base de datos y tablas (ajústalo según tu archivo SQL real)
// const sql = `
// CREATE DATABASE IF NOT EXISTS EOI;
// USE EOI;

// CREATE TABLE IF NOT EXISTS idiomes (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   nom VARCHAR(255) NOT NULL
// );

// CREATE TABLE IF NOT EXISTS cursos (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   nom VARCHAR(255) NOT NULL,
//   id_idioma INT,
//   FOREIGN KEY (id_idioma) REFERENCES idiomes(id)
// );
// `;

// connection.query(sql, function (err, results) {
//   if (err) {
//     console.error('❌ Error ejecutando SQL:', err);
//   } else {
//     console.log('✅ Base de datos y tablas creadas');
//   }
//   connection.end();
// });






// const mysql = require('mysql2');

// // Configuración conexión sin base de datos (porque la crearemos)
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',   // pon aquí tu contraseña si la tienes
//   multipleStatements: true  // permite ejecutar varias sentencias a la vez
// });

// // SQL para crear la base de datos y tablas
// const sql = `
// DROP DATABASE IF EXISTS EOI;
// CREATE DATABASE EOI;
// USE EOI;

// DROP TABLE IF EXISTS cursos;
// DROP TABLE IF EXISTS idiomes;

// CREATE TABLE idiomes(
//   id_idioma INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
//   nom_idioma VARCHAR(50),
//   nombre_idioma VARCHAR(50)
// );

// CREATE TABLE cursos(
//   id_curs INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
//   Nom VARCHAR(255),
//   id_idioma INT,
//   Nivell VARCHAR(5),
//   Tipus VARCHAR(20),
//   Any INT,
//   Hores INT,
//   Preu FLOAT,
//   Places INT,
//   Descripcio VARCHAR(5000)
// );

// INSERT INTO idiomes (nom_idioma, nombre_idioma) VALUES
// ('Anglès', 'Inglés'),
// ('Francès', 'Francés'),
// ('Alemany', 'Alemán'),
// ('Japonès', 'Japonés'),
// ('Xinès', 'Chino'),
// ('Rus', 'Ruso');

// INSERT INTO cursos (id_curs, Nom, id_idioma, Nivell, Tipus, Any, Hores, Preu, Places, Descripcio) VALUES
// (1, 'Anglès 1r', 1, 'A1.2', 'Ordinari', 2016, 130, 400, 30, 'Curs 1');
// `;

// connection.connect(err => {
//   if (err) throw err;
//   console.log('Conectado a MySQL para inicializar la base de datos');

//   connection.query(sql, (err, results) => {
//     if (err) throw err;
//     console.log('✅ Base de datos y tablas creadas e insertados datos');

//     connection.end();
//   });
// });



const mysql = require('mysql2');

// Configuración conexión sin base de datos (porque la crearemos)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // pon aquí tu contraseña si la tienes
  multipleStatements: true // permite ejecutar varias sentencias a la vez
});

// SQL para crear la base de datos, tablas e insertar datos (ejemplo reducido)
const sql = `
DROP DATABASE IF EXISTS EOI;
CREATE DATABASE EOI;
USE EOI;

DROP TABLE IF EXISTS matricules;
DROP TABLE IF EXISTS professors;
DROP TABLE IF EXISTS cursos;
DROP TABLE IF EXISTS idiomes;

CREATE TABLE idiomes(
  id_idioma INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nom_idioma VARCHAR(50),
  nombre_idioma VARCHAR(50)
);

CREATE TABLE cursos(
  id_curs INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  Nom VARCHAR(255),
  id_idioma INT,
  Nivell VARCHAR(5),
  Tipus VARCHAR(20),
  Any INT,
  Hores INT,
  Preu FLOAT,
  Places INT,
  Descripcio VARCHAR(5000),
  CONSTRAINT fk_cursos_idioma FOREIGN KEY (id_idioma) REFERENCES idiomes(id_idioma)
);

CREATE TABLE professors (
  id_professor INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(100),
  especialitat VARCHAR(100)
);

CREATE TABLE matricules (
  id_matricula INT PRIMARY KEY AUTO_INCREMENT,
  id_curs INT,
  alumne VARCHAR(100),
  data_matricula DATE,
  CONSTRAINT fk_matricules_cursos FOREIGN KEY (id_curs) REFERENCES cursos(id_curs)
);

INSERT INTO idiomes (nom_idioma, nombre_idioma) VALUES
  ('Anglès', 'Inglés'),
  ('Francès', 'Francés'),
  ('Alemany', 'Alemán'),
  ('Japonès', 'Japonés'),
  ('Xinès', 'Chino'),
  ('Rus', 'Ruso');

INSERT INTO cursos (id_curs, Nom, id_idioma, Nivell, Tipus, Any, Hores, Preu, Places, Descripcio) VALUES
  (1, 'Anglès 1r', 1, 'A1.2', 'Ordinari', 2016, 130, 400, 30, 'Curs 1'),
  (2, 'Anglès 2n', 1, 'A2', 'Ordinari', 2016, 130, 400, 30, 'Curs 2'),
  (3, 'Francès 1r', 2, 'A1.2', 'Ordinari', 2016, 130, 400, 30, 'Curs 3');

INSERT INTO professors (nom, especialitat) VALUES
  ('Joan Martínez', 'Anglès'),
  ('Marta López', 'Francès');

INSERT INTO matricules (id_curs, alumne, data_matricula) VALUES
  (1, 'Ana Pérez', '2023-09-01'),
  (1, 'Luis García', '2023-09-05');
`;

connection.connect(err => {
  if (err) {
    console.error('Error al conectar con MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL para inicializar la base de datos');

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al ejecutar script SQL:', err);
    } else {
      console.log('✅ Base de datos, tablas creadas e insertados datos correctamente');
    }
    connection.end(err => {
      if (err) {
        console.error('Error al cerrar la conexión:', err);
      } else {
        console.log('Conexión MySQL cerrada');
      }
    });
  });
});
