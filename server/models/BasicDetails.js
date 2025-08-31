import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    fullName: String,
    role: String,
    bio: String,
    email: String,
    phone: String,
    location: String,
    profileImage: String,   // file path
    resume: String,         // file path
    skills: [String],
    socialLinks: [{ title: String, url: String }]
});

export default mongoose.model("BasicDetails", profileSchema);
