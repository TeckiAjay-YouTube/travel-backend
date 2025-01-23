import express from "express";
import { packageList, userList } from "../../controllers/adminPannelControllers/utils.controller.js";
import { adminVerify } from "../../middlewares/authVerifyMiddleware.js";
const router = express.Router();

router.get("/packageList", adminVerify, packageList);

router.get("/userList", adminVerify, userList);


export default router;