import mongoose from 'mongoose';

const academicSchema = new mongoose.Schema({
    college: { type: String, required: true },
    degree: { type: String, required: true },
    duration: { type: String, required: true },
    location: { type: String, required: true },
    score: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Academic', academicSchema);
