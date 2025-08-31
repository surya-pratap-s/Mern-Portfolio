import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    company: { type: String, required: true },
    duration: { type: String, required: true },
    certificateLink: { type: String },
}, { timestamps: true });

export default mongoose.model('Certificate', certificateSchema);
