import express from "express";
const router = express.Router();
import { celebrate, Joi } from "celebrate";
import { adminVerify } from "../../middlewares/authVerifyMiddleware.js";
import { getAllPackage } from "../../controllers/adminPannelControllers/package.controller.js";

router.get("/getAllPackage", adminVerify, getAllPackage);

export default router;