import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    skills: [String],
}, { timestamps: true });

export default mongoose.model('Certificate', certificateSchema);
