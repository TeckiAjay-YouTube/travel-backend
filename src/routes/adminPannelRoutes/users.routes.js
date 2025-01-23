import express from "express";
import { addUser, getUser, loginUser, logOutUser } from "../../controllers/adminPannelControllers/users.controller.js";
const router = express.Router();
import { celebrate, Joi } from "celebrate";

router.get("/getUsers", getUser);

router.post("/addUser", celebrate({
    body: Joi.object({
        isRole: Joi.string().valid("Users").required(),
        websiteLinked: Joi.string().required().length(24),
        fullName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required().min(5),
        mobileNumber: Joi.string().required(),
        addresh: Joi.object({
            country: Joi.string().required(),
            state: Joi.string().required(),
            city: Joi.string().required(),
            addresh: Joi.string().required(),
            pincode: Joi.number().required()
        }),
        isActive: Joi.boolean().optional(),
    })
}), addUser);

router.post("/login", celebrate({
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
}), loginUser);

router.get("/logout", logOutUser);

export default router;