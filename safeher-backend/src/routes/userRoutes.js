import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserStats
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/stats', authorize('admin'), getUserStats);
router.get('/', authorize('admin'), getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

export default router;