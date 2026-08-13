import express from 'express';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  setPrimaryContact
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getContacts);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
router.put('/:id/primary', setPrimaryContact);

export default router;