require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

// Configuration:
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Hello world!',
    id: req.params.id
  });
});

console.log(`Server started! on port ${process.env.PORT}!`);

app.listen(3000);
