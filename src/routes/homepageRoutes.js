import express from "express";
const router = express.Router();
import { editHomepage, getHomepage } from "../controllers/homepageController.js";
import { adminVerify } from "../middlewares/authVerifyMiddleware.js";

router.patch("/homepage", adminVerify, editHomepage);
router.get("/homepage", adminVerify, getHomepage);

export default router;
