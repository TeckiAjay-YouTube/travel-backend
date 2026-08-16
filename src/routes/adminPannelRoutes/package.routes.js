import express from "express";
const router = express.Router();
import { celebrate, Joi } from "celebrate";
import upload from "../../middlewares/MulterMiddleware.js";
import { adminVerify } from "../../middlewares/authVerifyMiddleware.js";
import { addPackage, deletePackage, getAllPackage, singlePackage, updatePackage } from "../../controllers/adminPannelControllers/package.controller.js";

router.get("/getAllPackage", adminVerify, getAllPackage);

router.post("/addPackage", celebrate({
        body: Joi.object({
            title: Joi.string().required().min(3),
            description: Joi.string().required().min(20),
            image: Joi.string().required(),
            price: Joi.string().required(),
            duration: Joi.string().required(),
            pickUpPoint: Joi.string().required(),
            dropPoint: Joi.string().required(),
            pdf: Joi.string().optional(),
            slug: Joi.string().required(),
            slugContent: Joi.string().required(),
            extraField: Joi.string().optional(),
            isStatus: Joi.boolean().optional(),
        })
    }), adminVerify, addPackage);

router.get("/singlePackage/:id", celebrate({
    params: Joi.object({
        id: Joi.string().required().length(24),
    })
}), adminVerify, singlePackage);

router.post("/updatePackage/:id", celebrate({
    body: Joi.object({
        title: Joi.string().optional().min(3),
        description: Joi.string().optional().min(20),
        image: Joi.string().optional(),
        price: Joi.string().optional(),
        duration: Joi.string().optional(),
        pickUpPoint: Joi.string().optional(),
        dropPoint: Joi.string().optional(),
        pdf: Joi.string().optional(),
        slug: Joi.string().optional(),
        slugContent: Joi.string().optional(),
        extraField: Joi.string().optional(),
        isStatus: Joi.boolean().optional(),
    }),
    params: Joi.object({
        id: Joi.string().required().length(24),
    })
}), adminVerify, updatePackage);

router.get("/deletePackage/:id", celebrate({
    params: Joi.object({
        id: Joi.string().required().length(24),
    })
}), adminVerify, deletePackage);

export default router;