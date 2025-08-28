import express from 'express';
import {
    getAcademics,
    createAcademic,
    updateAcademic,
    deleteAcademic
} from '../controllers/academicController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAcademics);
router.post('/', verifyToken, createAcademic);
router.put('/:id', verifyToken, updateAcademic);
router.delete('/:id', verifyToken, deleteAcademic);

export default router;
