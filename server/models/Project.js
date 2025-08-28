import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  imageUrl: String,
  liveUrl: String,
  githubUrl: String,
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);