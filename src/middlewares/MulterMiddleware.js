import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/")
    },
    filename: (req, file, cb) => {
        const suffix = Date.now();
        cb(null, suffix + '-' + file.originalname);
    }
})

export const uploadFile = multer({ storage })