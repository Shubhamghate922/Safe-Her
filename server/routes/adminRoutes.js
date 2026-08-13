import express from 'express';
import {
  getAllUsers,
  getAllSOSAlerts,
  getActiveSOSAlerts,
  getStatistics,
  adminResolveSOS,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// All admin routes are protected and require admin role
router.use(protect);
router.use(admin);

router.get('/users', getAllUsers);
router.get('/sos', getAllSOSAlerts);
router.get('/sos/active', getActiveSOSAlerts);
router.get('/statistics', getStatistics);
router.put('/sos/:id/resolve', adminResolveSOS);

export default router;