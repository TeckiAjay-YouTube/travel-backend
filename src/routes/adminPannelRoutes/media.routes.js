import express from "express";
const router = express.Router();
import { celebrate, Joi } from "celebrate";
import upload from "../../middlewares/MulterMiddleware.js";
import { adminVerify } from "../../middlewares/authVerifyMiddleware.js";
import { addMedia, deleteMedia, getAllMedia, singleMedia, updateMedia } from "../../controllers/adminPannelControllers/media.controller.js";

router.get("/getAllMedia", adminVerify, getAllMedia);

router.post("/addMedia", upload.fields([
    {
        name: "image",
        maxCount: 1
    }
]), celebrate({
        body: Joi.object({
            title: Joi.string().required().min(3),
            description: Joi.string().required().min(20)
        })
    }), adminVerify, addMedia);

router.get("/singleMedia/:id", celebrate({
    params: Joi.object({
        id: Joi.string().required().length(24),
    })
}), adminVerify, singleMedia);

router.post("/updateMedia/:id", celebrate({
    body: Joi.object({
        title: Joi.string().optional().min(3),
        description: Joi.string().optional().min(20),
        isStatus: Joi.boolean().optional(),
    }),
    params: Joi.object({
        id: Joi.string().required().length(24),
    })
}), adminVerify, updateMedia);

router.get("/deleteMedia/:id", celebrate({
    params: Joi.object({
        id: Joi.string().required().length(24),
    })
}), adminVerify, deleteMedia);

export default router;