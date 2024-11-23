const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const { getGoogleAuthURL } = require('../utils/authUtils');
const { generateToken } = require('../utils/jwtUtils');

const bcrypt = require('bcrypt');
const prisma = require('../utils/prismaClient');
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/auth/google/callback'
);

const generateGoogleAuthUrl = (req, res) => {
  const authURL = getGoogleAuthURL(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_REDIRECT_URI
  );
  res.redirect(authURL);
};

const register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        google_id: null,
      },
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: { token },
    // });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login' });
  }
};

const googleAuth = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ message: 'Authorization code is required' });
  }

  try {
    // Menukarkan kode authorization untuk mendapatkan token
    const { tokens } = await oauth2Client.getToken(code);
    if (!tokens) {
      throw new Error('No tokens received');
    }
    oauth2Client.setCredentials(tokens);

    // Mendapatkan user info
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });
    const { data } = await oauth2.userinfo.get();

    if (!data.email || !data.name) {
      return res.json({
        data: data,
      });
    }

    let user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: 'google',
          google_id: data.id,
        },
      });
    }

    // Buat payload untuk JWT token
    const token = generateToken({
      id: user.id,
      google_id: user.google_id,
      name: user.name,
    });

    // Kirim response berisi data user dan token
    return res.json({
      message: user ? 'Login successful' : 'User registered successfully',
      data: {
        google_id: user.google_id,
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    return res.status(500).json({
      message: 'Authentication failed',
      error: error.message,
    });
  }
};

module.exports = { register, login, googleAuth, generateGoogleAuthUrl };
