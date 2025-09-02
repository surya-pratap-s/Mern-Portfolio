import express from "express";
import { getBasicDetails, saveBasicDetails, addSkill, removeSkill, addSocialLink, removeSocialLink } from "../controllers/BasicDetailsControllers.js";
import { upload } from "../middleware/upload.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBasicDetails);
router.post("/save",
    // upload.fields([{ name: "profileImage", maxCount: 1 }, { name: "resume", maxCount: 1 }]), 
    upload.none(),
    saveBasicDetails);

router.post("/skill/add", addSkill);
router.post("/skill/remove", verifyToken, removeSkill);
router.post("/social/add", verifyToken, addSocialLink);
router.post("/social/remove", verifyToken, removeSocialLink);

export default router;
