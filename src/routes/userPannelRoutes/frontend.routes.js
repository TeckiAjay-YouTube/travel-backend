import express from "express";
const router = express.Router();
import { celebrate, Joi } from "celebrate";
import { getAllBlogUser, getAllPackageUser, getBlogInfo, getPackageInfo } from "../../controllers/userPannelControllers/frontend.controller.js";

router.get("/getPackage/:slug", celebrate({
    params: Joi.object({
        slug: Joi.string().required().trim(),
    }),
    query: Joi.object({
        websiteId: Joi.string().required().trim().length(24),
    })
}), getPackageInfo);

router.get("/getAllPackage", celebrate({
    query: Joi.object({
        websiteId: Joi.string().required().trim().length(24),
    })
}), getAllPackageUser);

router.get("/getAllBlog/:slug", celebrate({
    params: Joi.object({
        slug: Joi.string().required().trim(),
    }),
    query: Joi.object({
        websiteId: Joi.string().required().trim().length(24),
    })
}), getBlogInfo);

router.get("/getAllBlog", celebrate({
    query: Joi.object({
        websiteId: Joi.string().required().trim().length(24),
    })
}), getAllBlogUser);

export default router;