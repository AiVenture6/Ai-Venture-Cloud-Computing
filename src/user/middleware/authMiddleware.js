const { verifyToken } = require('../utils/jwtUtils');
const prisma = require('../utils/prismaClient');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ error: 'User does not exist or has been deleted' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { authenticate };
