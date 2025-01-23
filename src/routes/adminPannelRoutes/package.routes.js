import express from "express";
const router = express.Router();
import { celebrate, Joi } from "celebrate";
import { adminVerify } from "../../middlewares/authVerifyMiddleware.js";
import { addPackage, deletePackage, getAllPackage, updatePackage } from "../../controllers/adminPannelControllers/package.controller.js";

router.get("/getAllPackage", adminVerify, getAllPackage);

router.post("/addPackage", celebrate({
    body: Joi.object({
        title: Joi.string().required().min(3),
        description: Joi.string().required().min(20),
        image: Joi.string().required(),
        pdf: Joi.string().optional(),
        redirectLink: Joi.string().required(),
        extraField: Joi.string().optional(),
        isStatus: Joi.boolean().optional(),
    })
}), adminVerify, addPackage);

router.post("/updatePackage/:id", celebrate({
    body: Joi.object({
        title: Joi.string().optional().min(3),
        description: Joi.string().optional().min(20),
        image: Joi.string().optional(),
        pdf: Joi.string().optional(),
        redirectLink: Joi.string().optional(),
        extraField: Joi.string().optional(),
        isStatus: Joi.boolean().optional(),
    }),
    params: Joi.object({
        id: Joi.string().required().length(24),
    })
}), adminVerify, updatePackage);

router.post("/deletePackage/:id", celebrate({
    params: Joi.object({
        id: Joi.string().required().length(24),
    })
}), adminVerify, deletePackage);


export default router;