const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const lessonsController = require('../../controllers/lessons');

router.get('/', lessonsController.getAllLessons);
router.get('/:id', lessonsController.getLesson);
router.post('/', lessonsController.postNewLesson);
router.patch('/:id', lessonsController.patchLesson);
router.delete('/:id', lessonsController.deleteLesson);

module.exports = router;
