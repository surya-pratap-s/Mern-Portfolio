import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    companyAddress: { type: String },
    duration: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);
