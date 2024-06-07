const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();

// PostgreSQL Connection
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123',
  port: 5432
});

// Test PostgreSQL Connection
pool.connect((error) => {
  if (error) {
    console.log('Error connecting to database:', error);
  } else {
    console.log('Database connected successfully!');
  }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Define Routes
const routes = express.Router();

app.get('/users', (request, response) => {
  const query = `SELECT * FROM tdet`;

  pool.query(query, (error, results) => {
    if (error) {
      console.log('Error retrieving data from database:', error);
      response.status(500).json({ error: 'Error retrieving data from database' });
    } else {
      response.status(200).json(results.rows);
    }
  });
});

app.get('/tools', (req, res) => {
  const query = 'SELECT * FROM det';
  
  pool.query(query, (error, results) => {
    if (error) {
      console.log('Error retrieving data from database:', error);
      res.status(500).json({ error: 'Error retrieving data from database' });
    } else {
      res.status(200).json(results.rows);
    }
  });
});

// Serve Static Files
app.use(express.static('public'));

// Define a route for the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/page1.html');
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/manifest.json');
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/serviceworker.js');
});
// Start the Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
