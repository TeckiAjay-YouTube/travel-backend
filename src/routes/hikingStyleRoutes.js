import express from "express";
import {
  getHikingStyle,
  editHikingStyle,
  createHikingStyle,
  deleteHikingStyle,
} from "../controllers/userPannelControllers/hikingStyleController.js";
import { adminVerify } from "../middlewares/authVerifyMiddleware.js";

const router = express.Router();

router.get("/hiking-style", getHikingStyle);
router.put("/hiking-style/:id", adminVerify, editHikingStyle);
router.post("/hiking-style", adminVerify, createHikingStyle);
router.delete("/hiking-style/:id", adminVerify, deleteHikingStyle);

export default router;
