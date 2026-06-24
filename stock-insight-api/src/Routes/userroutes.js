const express = require('express');

const authenticateToken = require('../Middleware/authMiddleware');
const userController = require('../Controller/UserController');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/preferences', authenticateToken, userController.getPreferences);
router.post('/preferences', authenticateToken, userController.savePreferences);

module.exports = router;
