const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const teachersController = require('../../controllers/teachers');

router.get('/', teachersController.getAllTeachers);
router.post('/', [body('name').notEmpty()],teachersController.postNewTeacher);

module.exports = router;