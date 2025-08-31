import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { createExperience, deleteExperience, getExperiences, updateExperience } from '../controllers/ExperienceController.js';

const router = express.Router();

router.get('/', getExperiences);
router.post('/', verifyToken, createExperience);
router.put('/:id', verifyToken, updateExperience);
router.delete('/:id', verifyToken, deleteExperience);

export default router;
