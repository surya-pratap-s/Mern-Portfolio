import mongoose from 'mongoose';

const academicSchema = new mongoose.Schema({
    collegeName: { type: String, required: true },
    boardName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    course: { type: String, required: true },
    score: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Academic', academicSchema);
