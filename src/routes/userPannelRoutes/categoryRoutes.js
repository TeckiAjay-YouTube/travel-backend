import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getSingleCategory,
} from "../.././controllers/userPannelControllers/categoryController.js";
import express from "express";
import { adminVerify } from "../../middlewares/authVerifyMiddleware.js";
import upload from "../../middlewares/MulterMiddleware.js";

const router = express.Router();

router.post("/category", adminVerify, upload.single("image"), createCategory);
router.get("/category", getCategories);
router.patch("/category/:id", adminVerify, updateCategory);
router.delete("/category/:id", adminVerify, deleteCategory);
router.get("/category/:id", getSingleCategory);

export default router;
