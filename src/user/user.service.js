const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const {
  findUserByEmail,
  findUserById,
  createUser,
  updateUserData,
  updateUserOtp,
  updateUserVerificationStatus,
} = require('./user.model');
const { sendOtpEmail } = require('../utils/otp.utils');
const { generateToken } = require('../utils/auth.middleware');
const { addMinutes } = require('date-fns');

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const authenticateGoogleUser = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const { data } = await oauth2Client.request({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
  });

  let user = await findUserByEmail(data.email);
  const isNewUser = !user;

  if (!user) {
    user = await createUser({
      google_id: data.id,
      name: data.name,
      email: data.email,
      picture: data.picture,
      password: 'googleauth',
      isOtpVerified: true,
    });
  }

  const token = generateToken({ id: user.id, email: user.email });
  return { user, token, isNewUser };
};

const registerUser = async ({ name, email, password }) => {
  const user = await findUserByEmail(email);
  if (user) throw new Error('User with this email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser({ name, email, password: hashedPassword });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = addMinutes(new Date(), 5);
  const token =  generateToken({ id: newUser.id });
  await updateUserOtp(newUser.id, otp, otpExpiry);
  await sendOtpEmail(email, otp);

  return { message: 'User registered successfully. Please verify your OTP.', token };
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = generateToken({ id: user.id });
  return { user, token };
};

const verifyUserOtp = async ({ userId, otp }) => {
  const user = await findUserById(userId);
  if (!user) throw new Error('User not found');

  if (user.otp !== otp || new Date() > new Date(user.otp_expiry)) {
    throw new Error('Invalid or expired OTP');
  }

  await updateUserOtp(userId, null, null);
  await updateUserVerificationStatus(userId, true);

  const token = generateToken({ id: user.id });
  return { message: 'OTP verified successfully', token };
};

const getUserProfileById = async (id) => {
  const user = await findUserById(id);
  if (!user) throw new Error('User not found');
  return user;
};

const updateUserProfile = async (userId, updates) => {
  const updatedUser = await updateUserData(userId, updates);
  return { changes: Object.keys(updates), updatedUser };
};

module.exports = {
  authenticateGoogleUser,
  registerUser,
  loginUser,
  verifyUserOtp,
  getUserProfileById,
  updateUserProfile,
};
