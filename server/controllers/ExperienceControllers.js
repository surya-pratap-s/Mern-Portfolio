import Experience from '../models/Experiences.js';

export const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ startDate: -1 });
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createExperience = async (req, res) => {
    try {
        const experiences = new Experience(req.body);
        await experiences.save();
        res.status(201).json(experiences);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

export const updateExperience = async (req, res) => {
    try {
        const experiences = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!experiences) return res.status(404).json({ message: 'Experience record not found' });
        res.json(experiences);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

export const deleteExperience = async (req, res) => {
    try {
        const experiences = await Experience.findByIdAndDelete(req.params.id);
        if (!experiences) return res.status(404).json({ message: 'Experience record not found' });
        res.json({ message: 'Experience record deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
