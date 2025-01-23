import packageDB from "../../models/package.model.js"
import userDB from "../../models/users.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

export const packageList = asyncHandler(async (req, res, next) => {
    const websiteLinkId = req?.user?.websiteLinked
    let packagelist = await packageDB.find({ websiteLinked: websiteLinkId }, { _id: 1, title: 1 });

    if (packagelist.length == 0) {
        return next(new ApiError(400, "No Package Found !"))
    }
    res.status(200).json(new ApiResponse(200, packagelist))
});

export const userList = asyncHandler(async (req, res, next) => {
    const websiteLinkId = req?.user?.websiteLinked
    let packagelist = await userDB.find({ websiteLinked: websiteLinkId, isStatus: true }, { _id: 1, fullName: 1 });

    if (packagelist.length === 0) {
        return next(new ApiError(400, "No User Avabile !"))
    }
    res.status(200).json(new ApiResponse(200, packagelist))
});