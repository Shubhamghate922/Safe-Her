import express from 'express';
import {
  createSOSAlert,
  getSOSHistory,
  getSOSAlert,
  resolveSOSAlert,
} from '../controllers/sosController.js';
import { protect } from '../middleware/authMiddleware.js';
import { sosValidation, validateRequest } from '../utils/validators.js';

const router = express.Router();

router.post('/', protect, sosValidation, validateRequest, createSOSAlert);
router.get('/history', protect, getSOSHistory);
router.get('/:id', protect, getSOSAlert);
router.put('/:id/resolve', protect, resolveSOSAlert);

export default router;