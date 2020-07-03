const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const studentController = require('../../controllers/students');

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudent);
router.post('/', studentController.postNewStudent);
router.patch('/:id', studentController.patchStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;