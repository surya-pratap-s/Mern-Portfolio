import Certificate from '../models/Certificate.js';

export const getCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ startDate: -1 });
        res.json(certificates);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createCertificate = async (req, res) => {
    try {
        const certificate = new Certificate(req.body);
        await certificate.save();
        res.status(201).json(certificate);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

export const updateCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
        res.json(certificate);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

export const deleteCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findByIdAndDelete(req.params.id);
        if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
        res.json({ message: 'Certificate deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
