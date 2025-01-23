import express from "express";
const router = express.Router();
import { celebrate, Joi } from "celebrate";
import { addWebsite, deleteWebsite, getAllWebsite, updateWebsite } from "../../controllers/superAdminControllers/websiteSuper.controller.js";

router.get("/getWebsites", getAllWebsite);

router.post("/addWebsite", celebrate({
    body: Joi.object({
        websiteName: Joi.string().required(),
        websiteInfo: Joi.string().required(),
        websiteDescription: Joi.string().optional(),
        websiteDomain: Joi.string().required(),
        isStatus: Joi.boolean().optional().default(true),
    })
}), addWebsite);

router.delete("/deleteWebsite/:id", celebrate({
    params: Joi.object({
        id: Joi.string().required().length(24),
    })
}), deleteWebsite);

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
}), updateWebsite);

export default router;