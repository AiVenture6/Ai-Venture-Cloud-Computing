const { getGoogleAuthURL, getTokens, getUserInfo } = require('../utils/authUtils');
const { generateToken } = require('../utils/jwtUtils');
const { OAuth2Client } = require('google-auth-library');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const loginGoogle = (req, res) => {
  const authURL = getGoogleAuthURL(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_REDIRECT_URI);
  res.redirect(authURL);
};

const registerGoogle = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing.' });
  }

  try {
    const tokens = await getTokens({
      code,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
    });

    const userInfo = await getUserInfo(tokens.access_token);

    // Generate JWT token
    const token = generateToken({
      googleId: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        googleId: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        token: token
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

module.exports = {
  loginGoogle,
  registerGoogle,
};
