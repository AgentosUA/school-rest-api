const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const checkAuth = require('../../middleware/check-auth');
const lessonsController = require('../../controllers/lessons');

router.get('/', lessonsController.getAllLessons);
router.get('/:id', lessonsController.getLesson);
router.post('/', checkAuth, lessonsController.postNewLesson);
router.patch('/:id', checkAuth, lessonsController.patchLesson);
router.delete('/:id', checkAuth, lessonsController.deleteLesson);

module.exports = router;
