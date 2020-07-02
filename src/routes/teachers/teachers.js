const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const teachersController = require('../../controllers/teachers');

router.get('/', teachersController.getAllTeachers);
router.get('/:id', teachersController.getTeacher);
router.patch('/:id', teachersController.patchTeacher);
router.post('/', [body('name').notEmpty()],teachersController.postNewTeacher);
router.delete('/:id', teachersController.deleteTeacher);

module.exports = router;