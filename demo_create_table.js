const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hck#007'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
});