import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getSingleCategory
} from "../.././controllers/userPannelControllers/exploreSectionController.js";
import express from "express";
import { adminVerify } from "../../middlewares/authVerifyMiddleware.js";

const router = express.Router();

router.post("/category", adminVerify, createCategory);
router.get("/category", getCategories);
router.patch("/category/:id", adminVerify, updateCategory);
router.delete("/category/:id", adminVerify, deleteCategory);
router.get("/category/:id", getSingleCategory);

export default router;
