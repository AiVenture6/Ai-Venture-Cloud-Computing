const express = require('express');
const { loginGoogle, registerGoogle } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/google', loginGoogle);  // Route untuk login Google
router.get('/google/callback', registerGoogle);  // Route untuk callback Google
router.get('/verify-token', authenticate, (req, res) => { // Verifikasi token
  res.status(200).json({
    message: 'Token is valid',
    user: req.user, 
  });
});

module.exports = router;