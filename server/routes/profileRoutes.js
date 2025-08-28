import express from "express";
import { saveProfile, addSkill, removeSkill, addSocialLink, removeSocialLink, getProfile } from "../controllers/profileController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProfile);
router.post("/save",
    upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "resume", maxCount: 1 }
    ]),
    saveProfile
);

router.post("/skill/add", addSkill);
router.post("/skill/remove", removeSkill);
router.post("/social/add", addSocialLink);
router.post("/social/remove", removeSocialLink);

export default router;
