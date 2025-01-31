import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import userDB from "../models/users.model.js";
import jwt from "jsonwebtoken";

export const adminVerify = asyncHandler(async (req, res, next) => {
    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await userDB.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        if (user?.isStatus !== true || user?.isRole !== "Admin") {
            throw new ApiError(401, "Don't have permission to access this resource !")
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export const superAdminVerify = asyncHandler(async (req, res, next) => {
    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await userDB.findById(decodedToken?._id).select("-password -refreshToken")

        console.log(user)

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        if (user?.isStatus !== true || user?.isRole !== "SuperAdmin") {
            throw new ApiError(401, "Don't have permission to access this resource !")
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});