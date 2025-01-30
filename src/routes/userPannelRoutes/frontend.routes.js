import express from "express";
const router = express.Router();
import { celebrate, Joi } from "celebrate";
import { getPackageInfo } from "../../controllers/userPannelControllers/frontend.controller.js";

router.get("/getAllPackage/:slug", celebrate({
    params: Joi.object({
        slug: Joi.string().required().trim(),
    }),
    query: Joi.object({
        websiteId: Joi.string().required().trim().length(24),
    })
}), getPackageInfo);

export default router;