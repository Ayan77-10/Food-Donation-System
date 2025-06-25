// middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const isAuthenticated = async (req, res, next) =>{
  const token = req.cookies.AccessToken;
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    console.log(req.user)
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
