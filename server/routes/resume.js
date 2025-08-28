import express from 'express';
import {
    getResume,
    createResume,
    updateResume,
    deleteResume
} from '../controllers/resumeController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getResume);
router.post('/', verifyToken, createResume);
router.put('/:id', verifyToken, updateResume);
router.delete('/:id', verifyToken, deleteResume);

export default router;
