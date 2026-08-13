import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  refreshToken,
  changePassword
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.post('/refresh', refreshToken);
router.put('/change-password', protect, changePassword);

export default router;