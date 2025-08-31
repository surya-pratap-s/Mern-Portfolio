import BasicDetails from "../models/BasicDetails.js";
import fs from "fs";

export const getBasicDetails = async (req, res) => {
    try {
        const basicDetails = await BasicDetails.findOne();
        res.json({ basicDetails });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create or Update BasicDetails (replace old files if re-uploaded)
export const saveBasicDetails = async (req, res) => {
    try {
        const { fullName, role, bio, email, phone, location } = req.body;

        let basicDetails = await BasicDetails.findOne(); // single BasicDetails for demo
        if (!basicDetails) basicDetails = new BasicDetails();

        basicDetails.fullName = fullName;
        basicDetails.role = role;
        basicDetails.bio = bio;
        basicDetails.email = email;
        basicDetails.phone = phone;
        basicDetails.location = location;

        // Handle BasicDetails Image update
        if (req.files?.profileImage) {
            if (basicDetails.profileImage && fs.existsSync(basicDetails.profileImage)) {
                fs.unlinkSync(basicDetails.profileImage); // delete old
            }
            basicDetails.profileImage = req.files.profileImage[0].path;
        }

        // Handle Resume update
        if (req.files?.resume) {
            if (basicDetails.resume && fs.existsSync(basicDetails.resume)) {
                fs.unlinkSync(basicDetails.resume); // delete old
            }
            basicDetails.resume = req.files.resume[0].path;
        }

        await basicDetails.save();
        res.json({ success: true, basicDetails });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add Skill
export const addSkill = async (req, res) => {
    try {
        const { skill } = req.body;
        const basicDetails = await BasicDetails.findOne();
        basicDetails.skills.push(skill);
        await basicDetails.save();
        res.json(basicDetails.skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove Skill
export const removeSkill = async (req, res) => {
    try {
        const { index } = req.body;
        const basicDetails = await BasicDetails.findOne();
        basicDetails.skills.splice(index, 1);
        await basicDetails.save();
        res.json(basicDetails.skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Social Link
export const addSocialLink = async (req, res) => {
    try {
        const { title, url } = req.body;
        const basicDetails = await BasicDetails.findOne();
        basicDetails.socialLinks.push({ title, url });
        await basicDetails.save();
        res.json(basicDetails.socialLinks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove Social Link
export const removeSocialLink = async (req, res) => {
    try {
        const { index } = req.body;
        const basicDetails = await BasicDetails.findOne();
        basicDetails.socialLinks.splice(index, 1);
        await basicDetails.save();
        res.json(basicDetails.socialLinks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
