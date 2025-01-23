import express from "express";
import { addUser, changePassword, deleteUser, getUser, loginUser, logOutUser, register, updateUser } from "../../controllers/superAdminControllers/userSuper.controller.js";
const router = express.Router();
import { celebrate, Joi } from "celebrate";

router.get("/getUsers", getUser);

router.post("/addUser", celebrate({
    body: Joi.object({
        isRole: Joi.string().valid("SuperAdmin", "Admin", "Users").required(),
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
        isActive: Joi.boolean().optional().default(true),
    })
}), addUser);

router.patch("/updateUser/:id", celebrate({
    body: Joi.object({
        isRole: Joi.string().valid("SuperAdmin", "Admin", "Users").optional(),
        websiteLinked: Joi.string().optional().length(24),
        fullName: Joi.string().optional(),
        email: Joi.string().optional(),
        mobileNumber: Joi.string().optional(),
        addresh: Joi.object({
            country: Joi.string().optional(),
            state: Joi.string().optional(),
            city: Joi.string().optional(),
            addresh: Joi.string().optional(),
            pincode: Joi.number().optional()
        }),
        isActive: Joi.boolean().optional(),
    }),
    params: Joi.object({
        id: Joi.string().required().length(24),
    }),
}), updateUser);

router.delete("/deleteUser/:id", celebrate({
    params: Joi.object({
        id: Joi.string().required().length(24),
    }),
}), deleteUser);

router.post("/register", celebrate({
    body: Joi.object({
        isRole: Joi.string().valid("SuperAdmin").optional().default("SuperAdmin"),
        websiteLinked: Joi.string().required().length(24),
        fullName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required().min(5),
        mobileNumber: Joi.string().required(),
        secureKey: Joi.string().required(),
        addresh: Joi.object({
            country: Joi.string().required(),
            state: Joi.string().required(),
            city: Joi.string().required(),
            addresh: Joi.string().required(),
            pincode: Joi.number().required()
        }),
        isActive: Joi.boolean().optional().default(true),
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