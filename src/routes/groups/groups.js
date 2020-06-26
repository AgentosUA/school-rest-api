const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const groupController = require('../../controllers/groups');

router.get('/', groupController.getAllGroups);
router.post('/', groupController.postNewGroup);
router.delete('/', groupController.deleteGroup);

module.exports = router;