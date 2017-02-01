var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/preguntas';



/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
  //res.render('index', { title: 'Express' });
});



router.post('/api/v1/preguntas', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {pregunta: req.body.pregunta, respuestaa: req.body.respuestaa, respuestab:req.body.respuestab,
  respuestac:req.body.respuestac,correcta:req.body.correcta};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO preguntas(pregunta, respuestaa, respuestab, respuestac, correcta)'+
    'values($1, $2, $3, $4,$5)',
    [data.pregunta, data.respuestaa, data.respuestab, data.respuestac, data.correcta]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM preguntas ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.get('/api/v1/preguntas', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM preguntas ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


router.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM preguntas', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
});});

module.exports = router;
