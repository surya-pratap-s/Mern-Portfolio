import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { createProject, deleteProject, getProjects, updateProject } from '../controllers/ProjectControllers.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', verifyToken, createProject);
router.put('/:id', verifyToken, updateProject);
router.delete('/:id', verifyToken, deleteProject);

export default router;
