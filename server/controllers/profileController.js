import Profile from "../models/Profile.js";
import fs from "fs";

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json({ profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create or Update Profile (replace old files if re-uploaded)
export const saveProfile = async (req, res) => {
    try {
        const { fullName, role, bio, email, phone, location } = req.body;

        let profile = await Profile.findOne(); // single profile for demo
        if (!profile) profile = new Profile();

        profile.fullName = fullName;
        profile.role = role;
        profile.bio = bio;
        profile.email = email;
        profile.phone = phone;
        profile.location = location;

        // Handle Profile Image update
        if (req.files?.profileImage) {
            if (profile.profileImage && fs.existsSync(profile.profileImage)) {
                fs.unlinkSync(profile.profileImage); // delete old
            }
            profile.profileImage = req.files.profileImage[0].path;
        }

        // Handle Resume update
        if (req.files?.resume) {
            if (profile.resume && fs.existsSync(profile.resume)) {
                fs.unlinkSync(profile.resume); // delete old
            }
            profile.resume = req.files.resume[0].path;
        }

        await profile.save();
        res.json({ success: true, profile });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add Skill
export const addSkill = async (req, res) => {
    try {
        const { skill } = req.body;
        const profile = await Profile.findOne();
        profile.skills.push(skill);
        await profile.save();
        res.json(profile.skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove Skill
export const removeSkill = async (req, res) => {
    try {
        const { index } = req.body;
        const profile = await Profile.findOne();
        profile.skills.splice(index, 1);
        await profile.save();
        res.json(profile.skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Social Link
export const addSocialLink = async (req, res) => {
    try {
        const { title, url } = req.body;
        const profile = await Profile.findOne();
        profile.socialLinks.push({ title, url });
        await profile.save();
        res.json(profile.socialLinks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove Social Link
export const removeSocialLink = async (req, res) => {
    try {
        const { index } = req.body;
        const profile = await Profile.findOne();
        profile.socialLinks.splice(index, 1);
        await profile.save();
        res.json(profile.socialLinks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
