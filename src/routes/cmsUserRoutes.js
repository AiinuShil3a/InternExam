const express = require('express');
const router = express.Router();
const cmsUserController = require('../controllers/cmsUserController');

router.post('/create-admin-account', cmsUserController.cmsUserCreateAdminAccount);

module.exports = router;
