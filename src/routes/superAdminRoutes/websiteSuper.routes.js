import express from "express";
const router = express.Router();
import { celebrate, Joi } from "celebrate";
import { addWebsite, deleteWebsite, getAllWebsite, updateWebsite } from "../../controllers/superAdminControllers/websiteSuper.controller.js";
import { superAdminVerify } from "../../middlewares/authVerifyMiddleware.js";

router.get("/getWebsites", superAdminVerify, getAllWebsite);

router.post("/addWebsite", celebrate({
    body: Joi.object({
        websiteName: Joi.string().required(),
        websiteInfo: Joi.string().required(),
        websiteDescription: Joi.string().optional(),
        websiteDomain: Joi.string().required(),
        isStatus: Joi.boolean().optional().default(true),
    })
}), superAdminVerify, addWebsite);

router.delete("/deleteWebsite/:id", celebrate({
    params: Joi.object({
        id: Joi.string().required().length(24),
    })
}), superAdminVerify, deleteWebsite);

router.patch("/updateWebsite/:id", celebrate({
    body: Joi.object({
        websiteName: Joi.string().optional(),
        websiteInfo: Joi.string().optional(),
        websiteDescription: Joi.string().optional(),
        websiteDomain: Joi.string().optional(),
        isStatus: Joi.boolean().optional(),
    }),
    params: Joi.object({
        id: Joi.string().required().length(24),
    }),
}), superAdminVerify, updateWebsite);

export default router;