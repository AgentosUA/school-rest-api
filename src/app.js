require('dotenv').config({ path: './src/.config' });
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const DBConnect = require('./db/db');

// Import routes:

const teachersRoutes = require('./routes/teachers/teachers');

// Configuration:
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS:
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Origin'
  );
  next();
});

// Routes:
app.use('/teachers', teachersRoutes);

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASS) {
  console.log('Forgot to add .config file!');
  process.exit();
}

const startServer = async () => {
  await DBConnect();
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT}!`);
  });
};

startServer();
