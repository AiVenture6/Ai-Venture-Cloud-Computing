const bcrypt = require('bcrypt');
const {
  findUserByEmail,
  createUser,
  findUserById,
  updateUserData,
  deleteUser,
} = require('./user.model');
const { OAuth2Client } = require('google-auth-library');
const { generateToken } = require('../utils/auth.middleware');
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/auth/google/callback'
);

const authenticateGoogleUser = async (code) => {
  try {
    console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
    console.log('Received code:', code);

    const { tokens } = await oauth2Client.getToken(code);
    if (!tokens) {
      throw new Error('No tokens received');
    }
    oauth2Client.setCredentials(tokens);

    const { data } = await oauth2Client.request({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    });

    let user = await findUserByEmail(data.email);
    const isNewUser = !user;

    if (!user) {
      user = await createUser({
        id: data.id,
        google_id: data.id,
        name: data.name,
        email: data.email,
        picture: data.picture,
      });
    }

    const token = generateToken({
      id: user.id,
      google_id: user.google_id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    });

    return { user, token, isNewUser };
  } catch (error) {
    console.error('Error in authenticateGoogleUser:', error.message);
    throw error;
  }
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw Error('Invalid credentials');
  }

  const token = generateToken({ id: user.id, name: user.name });
  return { user, token };
};

const registerUser = async (userData) => {
  try {
    if (!userData.password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    let user = await findUserByEmail(userData.email);

    if (!user) {
      user = await createUser({
        ...userData,
        password: hashedPassword,
      });
    } else {
      throw new Error('User with this email already exists');
    }

    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return { user, token };
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

const getUserProfileById = async (id) => {
  const user = await findUserById(id);
  if (!user) throw Error('User not found');
  return user;
};

const updateUserProfile = async (userId, updates) => {
  try {
    const user = await findUserById(userId);
    if (!user) throw Error('User not found');

    const updatedData = {};
    const updateMessages = [];

    if (updates.name) {
      updatedData.name = updates.name;
      updateMessages.push('Name successfully updated');
    }

    if (updates.password) {
      updatedData.password = await bcrypt.hash(updates.password, 10);
      updateMessages.push('Password successfully updated');
    }

    if (updates.picture) {
      updatedData.picture = updates.picture;
      updateMessages.push('Profile picture successfully updated');
    }

    if (Object.keys(updatedData).length > 0) {
      const updatedUser = await updateUserData(userId, updatedData);
      return {
        success: true,
        messages: updateMessages,
        updatedUser,
      };
    }

    throw new Error('No updates provided');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  authenticateGoogleUser,
  loginUser,
  registerUser,
  getUserProfileById,
  updateUserProfile,
};
