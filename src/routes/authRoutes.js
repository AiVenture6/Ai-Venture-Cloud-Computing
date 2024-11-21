const express = require('express');
const { login, register, googleAuth, generateGoogleAuthUrl } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const prisma = require('../utils/prismaClient');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Get user profile
router.get('/profile', authenticate, (req, res) => {
  const { id, email, name } = req.user;
  res.status(200).json({
    message: 'Profile fetched successfully',
    user: { id, email, name },
  });
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, email },
    });

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Delete user account
router.delete('/profile', authenticate, async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.user.id },
    });

    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

// Logout
router.post('/logout', authenticate, (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/google', generateGoogleAuthUrl);
router.get('/google/callback', googleAuth);

module.exports = router;
