import express from "express";
import {
  createTripPicture,
  getTripPicture,
  deleteTripPicture,
} from "../controllers/tripPictureController.js";
import { adminVerify } from "../middlewares/authVerifyMiddleware.js";
import upload from "../middlewares/MulterMiddleware.js";

const router = express.Router();

router.post(
  "/trip-picture",
  adminVerify,
  upload.single("imageUrl"),
  createTripPicture
);
router.get("/trip-picture", getTripPicture);
router.delete("/trip-picture/:id", adminVerify, deleteTripPicture);

export default router;
