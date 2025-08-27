
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getProfile } = require('../controllers/userController');

const router = express.Router();

router.use(authenticateToken);

router.get('/profile', getProfile);

module.exports = router;
