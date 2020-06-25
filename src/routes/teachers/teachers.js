const express = require('express');
const router = express.Router();
const teachersController = require('../../controllers/teachers');

router.get('/', teachersController.getAllTeachers);

module.exports = router;