import packageDB from "../../models/package.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

export const getPackageInfo = asyncHandler(async (req, res, next) => {
    const websiteLinkId = req.query.websiteId;
    const slug = req.params.slug;
    console.log(websiteLinkId)
    let packagelist = await packageDB.find({ websiteLinked: websiteLinkId });
    if (packagelist.length === 0) {
        return next(new ApiError(400, "No Package Found !"))
    }
    res.status(200).json(new ApiResponse(200, {websiteLinkId,slug}))
});