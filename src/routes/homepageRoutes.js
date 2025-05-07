import express from "express";
const router = express.Router();
import {
  editHomepage,
  getHomepage,
} from "../controllers/homepageController.js";
import { adminVerify } from "../middlewares/authVerifyMiddleware.js";
import upload from "../middlewares/MulterMiddleware.js";

router.patch(
  "/homepage",
  adminVerify,
  upload.single("bannerImg"),
  editHomepage
);
router.get("/homepage", getHomepage);

export default router;
