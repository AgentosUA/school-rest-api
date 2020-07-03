const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const checkAuth = require('../../middleware/check-auth');
const teachersController = require('../../controllers/teachers');

router.get('/', teachersController.getAllTeachers);
router.get('/:id', teachersController.getTeacher);
router.post('/', checkAuth, [body('name').notEmpty()], teachersController.postNewTeacher);
router.patch('/:id', checkAuth, teachersController.patchTeacher);
router.delete('/:id', checkAuth, teachersController.deleteTeacher);

module.exports = router;