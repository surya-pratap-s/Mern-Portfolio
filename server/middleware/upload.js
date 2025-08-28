import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "profileImage") {
            cb(null, "uploads/images");
        } else if (file.fieldname === "resume") {
            cb(null, "uploads/resumes");
        } else {
            cb(null, "uploads");
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ storage });
