import express from 'express';
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from '../controllers/CertificateControllers.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCertificates);
router.post('/', verifyToken, createCertificate);
router.put('/:id', verifyToken, updateCertificate);
router.delete('/:id', verifyToken, deleteCertificate);

export default router;
