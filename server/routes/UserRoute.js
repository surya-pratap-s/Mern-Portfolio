import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { changePassword, getUser, login, register } from '../controllers/UserControllers.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.post("/change-password", verifyToken, changePassword);

export default router;
