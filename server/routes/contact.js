import express from 'express';
import {
  getContacts,
  createContact,
  markAsRead,
  deleteContact
} from '../controllers/contactController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getContacts);
router.post('/', createContact);
router.put('/read/:id', verifyToken, markAsRead);
router.delete('/:id', verifyToken, deleteContact);

export default router;
