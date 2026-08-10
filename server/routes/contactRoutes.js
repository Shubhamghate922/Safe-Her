import express from 'express';
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';
import { contactValidation, validateRequest } from '../utils/validators.js';

const router = express.Router();

router.route('/')
  .get(protect, getContacts)
  .post(protect, contactValidation, validateRequest, addContact);

router.route('/:id')
  .put(protect, updateContact)
  .delete(protect, deleteContact);

export default router;