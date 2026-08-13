import express from 'express';
import {
  saveLocation,
  getLocationHistory,
  getLatestLocation,
  shareLocation
} from '../controllers/locationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', saveLocation);
router.get('/history', getLocationHistory);
router.get('/latest', getLatestLocation);
router.post('/share', shareLocation);

export default router;