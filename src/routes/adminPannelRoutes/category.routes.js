import {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getSingleCategory,
} from "../.././controllers/adminPannelControllers/category.controller.js";
import express from "express";
import { celebrate, Joi } from "celebrate";
import { adminVerify } from "../../middlewares/authVerifyMiddleware.js";
import upload from "../../middlewares/MulterMiddleware.js";

const router = express.Router();

router.post("/addCategory", upload.single("image"), celebrate({
    body: Joi.object({
        icon: Joi.string().required(),
        categoryName: Joi.string().required(),
        subcategories: {
            name: Joi.string().required(),
            image: Joi.string().required(),
            description: Joi.string().required()
        },
        isStatus: Joi.boolean().optional(),
    })
}), adminVerify, createCategory);

router.get("/category", adminVerify, getCategories);

router.post("/updateCategory/:id", celebrate({
    body: Joi.object({
        icon: Joi.string().optional(),
        categoryName: Joi.string().optional(),
        subcategories: {
            name: Joi.string().optional(),
            image: Joi.string().optional(),
            description: Joi.string().optional()
        },
        isStatus: Joi.boolean().optional(),
    }),
    params: Joi.object({
        id: Joi.string().required().length(24),
    }),
}), adminVerify, updateCategory);

router.post("/deleteCategory/:id",
    celebrate({
        params: Joi.object({
            id: Joi.string().required().length(24),
        }),
    }), adminVerify, deleteCategory);

router.get("/singleCategory/:id",
    celebrate({
        params: Joi.object({
            id: Joi.string().required().length(24),
        }),
    }), adminVerify, getSingleCategory);

export default router;
