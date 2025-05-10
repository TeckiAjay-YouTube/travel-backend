import express from "express";
import {
  createTestimonial,
  getTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";
import upload from "../middlewares/MulterMiddleware.js";

const router = express.Router();

router.post("/testimonial", upload.single("profileImage"), createTestimonial);
router.get("/testimonial", getTestimonial);
router.delete("/testimonial/:id", deleteTestimonial);

export default router;
