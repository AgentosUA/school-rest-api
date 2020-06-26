const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const lessonsController = require('../../controllers/lessons');

router.get('/', lessonsController.getAllLessons);

module.exports = router;