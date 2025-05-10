import express from "express";
import {
  getHikingStyle,
  editHikingStyle,
  createHikingStyle,
  deleteHikingStyle,
} from "../controllers/userPannelControllers/hikingStyleController.js";
import { adminVerify } from "../middlewares/authVerifyMiddleware.js";
import upload from "../middlewares/MulterMiddleware.js";

const router = express.Router();

router.get("/hiking-style", getHikingStyle);
router.put("/hiking-style/:id", adminVerify, upload.single("image"), editHikingStyle);
router.post("/hiking-style", adminVerify, upload.single("image"), createHikingStyle);
router.delete("/hiking-style/:id", adminVerify, deleteHikingStyle);

export default router;
