const express = require('express');
const {
  authenticateGoogleUser,
  loginUser,
  registerUser,
  getUserProfileById,
  updateUserProfile,
} = require('./user.service');
const { userAuthMiddleware } = require('../utils/auth.middleware');

const router = express.Router();

router.get('/google', (req, res) => {
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const redirectUri = process.env.REDIRECT_URI;
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    access_type: 'offline',
  });
  const url = `${baseUrl}?${params.toString()}`;
  res.redirect(url);
});

router.get('/google/callback', async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res
        .status(400)
        .json({ message: 'Authorization code is required' });
    }
    const userData = await authenticateGoogleUser(code);

    res.json({
      message: userData.isNewUser
        ? 'User registered successfully'
        : 'Login successful',
      data: userData.user,
      token: userData.token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Authentication failed', error: error.message });
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

    const { user, token } = await registerUser({ name, email, password });
    res
      .status(201)
      .json({ message: 'User registered successfully', user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const data = await loginUser(email, password);
    res.json({ message: 'Login successful', data });
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
    const { success, messages, updatedUser } = await updateUserProfile(
      userId,
      req.body
    );
    if (success) {
      res.json({
        message: 'Update successful',
        changes: messages,
        userProfile: updatedUser,
      });
    } else {
      res.status(400).json({ message: 'No updates were made' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
