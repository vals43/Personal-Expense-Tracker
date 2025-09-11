
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getProfile, changePassword } = require('../controllers/userController');

const router = express.Router();

router.use(authenticateToken);

router.get('/profile', getProfile);
router.post('/change-password', changePassword);

module.exports = router;
