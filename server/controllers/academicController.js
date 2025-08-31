import Academic from '../models/Academics.js';

export const getAcademics = async (req, res) => {
    try {
        const academics = await Academic.find().sort({ startDate: -1 });
        res.json(academics);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createAcademic = async (req, res) => {
    try {
        const academic = new Academic(req.body);
        await academic.save();
        res.status(201).json(academic);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

export const updateAcademic = async (req, res) => {
    try {
        const academic = await Academic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!academic) return res.status(404).json({ message: 'Academic record not found' });
        res.json(academic);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

export const deleteAcademic = async (req, res) => {
    try {
        const academic = await Academic.findByIdAndDelete(req.params.id);
        if (!academic) return res.status(404).json({ message: 'Academic record not found' });
        res.json({ message: 'Academic record deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
