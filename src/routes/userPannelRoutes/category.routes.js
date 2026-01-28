import {
  getCategories,
  getSingleCategory,
} from "../../controllers/userPannelControllers/categoryController.js";
import express from "express";
import { celebrate, Joi } from "celebrate";

const router = express.Router();

router.get("/category", getCategories);
router.get("/category/:id",
  celebrate({
    params: Joi.object({
      id: Joi.string().required().length(24),
    }),
  }), getSingleCategory);

export default router;
