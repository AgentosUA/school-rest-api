const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const checkAuth = require('../../middleware/check-auth');
const groupController = require('../../controllers/groups');

router.get('/', groupController.getAllGroups);
router.get('/:id', groupController.getGroup);
router.post('/', checkAuth, groupController.postNewGroup);
router.patch('/:id', checkAuth, groupController.patchGroup);
router.delete('/:id', checkAuth, groupController.deleteGroup);

module.exports = router;
