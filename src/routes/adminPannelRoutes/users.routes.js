import express from "express";
import { addUser, changePassword, getUser, loginUser, logOutUser, register } from "../../controllers/adminPannelControllers/users.controller.js";
const router = express.Router();
import { celebrate, Joi } from "celebrate";

router.get("/getUsers", getUser);

router.post("/addUser", celebrate({
    body: Joi.object({
        userType: Joi.string().valid("Admin", "Manager", "Users").required(),
        fullName: Joi.string().required(),
        email: Joi.string().required(),
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

router.post("/register", celebrate({
    body: Joi.object({
        userType: Joi.string().valid("Users").required(),
        userName: Joi.string().required(),
        fullName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
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
}), register);

router.post("/changePassword", celebrate({
    body: Joi.object({
        userId: Joi.string().required().length(24),
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required(),
    })
}), changePassword);

router.post("/login", celebrate({
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
}), loginUser);

router.get("/logout", logOutUser);

export default router;