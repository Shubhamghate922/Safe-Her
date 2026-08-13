import express from 'express';
import {
  createSOSAlert,
  getSOSHistory,
  getSOSAlert,
  resolveSOSAlert,
  cancelSOSAlert
} from '../controllers/sosController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', createSOSAlert);
router.get('/history', getSOSHistory);
router.get('/:id', getSOSAlert);
router.put('/:id/resolve', authorize('admin'), resolveSOSAlert);
router.put('/:id/cancel', cancelSOSAlert);

export default router;