import express from "express";
const router = express.Router();
import { celebrate, Joi } from "celebrate";
import { adminVerify } from "../../middlewares/authVerifyMiddleware.js";
import { addBlog, deleteBlog, getAllBlog, updateBlog } from "../../controllers/adminPannelControllers/blog.controller.js";

router.get("/getAllBlog", adminVerify, getAllBlog);

router.post("/addBlog", celebrate({
    body: Joi.object({
        title: Joi.string().required().min(3),
        description: Joi.string().required().min(20),
        image: Joi.string().required(),
        slug: Joi.string().required(),
        slugContent: Joi.string().required(),
        category: Joi.string().required(),
        extraField: Joi.string().optional(),
        isStatus: Joi.boolean().optional(),
    })
}), adminVerify, addBlog);

router.post("/updateBlog/:id", celebrate({
    body: Joi.object({
        title: Joi.string().optional().min(3),
        description: Joi.string().optional().min(20),
        image: Joi.string().optional(),
        slug: Joi.string().optional(),
        slugContent: Joi.string().optional(),
        category: Joi.string().optional(),
        extraField: Joi.string().optional(),
        isStatus: Joi.boolean().optional(),
    }),
    params: Joi.object({
        id: Joi.string().required().length(24),
    })
}), adminVerify, updateBlog);

router.post("/deleteBlog/:id", celebrate({
    params: Joi.object({
        id: Joi.string().required().length(24),
    })
}), adminVerify, deleteBlog);

export default router;