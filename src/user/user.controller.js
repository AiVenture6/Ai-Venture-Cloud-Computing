const express = require('express');
const {
  authenticateGoogleUser,
  loginUser,
  registerUser,
  verifyUserOtp,
  getUserProfileById,
  updateUserProfile,
} = require('./user.service');
const { userAuthMiddleware } = require('../utils/auth.middleware');
const router = express.Router();

router.get('/google', (req, res) => {
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    access_type: 'offline',
  });
  res.redirect(`${baseUrl}?${params.toString()}`);
});

router.get('/google/callback', async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) throw new Error('Authorization code is required');

    const { user, token, isNewUser } = await authenticateGoogleUser(code);
    res.json({
      message: isNewUser ? 'User registered successfully' : 'Login successful',
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Name, email, and password are required' });
    }

    const result = await registerUser({ name, email, password });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post('/register/verify-otp', userAuthMiddleware, async (req, res) => {
  try {
    userId = req.user.id;
    const otp = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ message: 'User ID and OTP are required' });
    }

    const result = await verifyUserOtp({ userId, otp });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get('/profile', userAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const userProfile = await getUserProfileById(userId);
    res.json(userProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/profile', userAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { changes, updatedUser } = await updateUserProfile(userId, req.body);
    res.json({
      message: 'Profile updated successfully',
      changes,
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
