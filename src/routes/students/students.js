const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const checkAuth = require('../../middleware/check-auth');
const studentController = require('../../controllers/students');

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudent);
router.post('/', checkAuth, studentController.postNewStudent);
router.patch('/:id', checkAuth, studentController.patchStudent);
router.delete('/:id', checkAuth, studentController.deleteStudent);

module.exports = router;
