import Resume from '../models/Resume.js';

export const getResume = async (req, res) => {
    try {
        const resumes = await Resume.find().sort({ createdAt: -1 }).limit(1);
        res.json(resumes[0] || null);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createResume = async (req, res) => {
    try {
        await Resume.deleteMany({});
        const resume = new Resume(req.body);
        await resume.save();
        res.status(201).json(resume);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!resume) return res.status(404).json({ message: 'Resume not found' });
        res.json(resume);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findByIdAndDelete(req.params.id);
        if (!resume) return res.status(404).json({ message: 'Resume not found' });
        res.json({ message: 'Resume deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
