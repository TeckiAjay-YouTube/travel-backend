import websiteDB from "../../models/website.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

export const getAllWebsite = asyncHandler(async (req, res, next) => {
    let website = await websiteDB.find();
    if (website.length === 0) {
        return next(new ApiError(400, "No Website Found !"))
    }
    res.status(200).json(new ApiResponse(200, website))
});

export const addWebsite = asyncHandler(async (req, res) => {
    let websiteCreate = req.body;
    let website = await websiteDB.create(websiteCreate);
    res.status(200).json(new ApiResponse(200, website))
});

export const updateWebsite = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const UpdateData = req.body

    let website = await websiteDB.findByIdAndUpdate(id, UpdateData, { new: true })

    if (website == null) {
        return next(new ApiError(400, "Website Not Found and Unable to update !"))
    }

    res.status(200).json(new ApiResponse(200, website))
});

export const deleteWebsite = asyncHandler(async (req, res,next) => {
    const id = req.params.id

    let website = await websiteDB.findByIdAndDelete(id);

    if (!website) {
        return next(new ApiError(400, "website not found !"))
    }

    res.status(200).json(new ApiResponse(200, "Website Delete Successfully !"))
});