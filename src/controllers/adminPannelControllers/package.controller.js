import packageDB from "../../models/package.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import mongoose from "mongoose";

export const getAllPackage = asyncHandler(async (req, res, next) => {
    const websiteLinkId = req.user.websiteLinked
    let packagelist = await packageDB.find({ websiteLinked: websiteLinkId });
    if (packagelist.length === 0) {
        return next(new ApiError(400, "No Package Found !"))
    }
    res.status(200).json(new ApiResponse(200, packagelist))
});

export const addPackage = asyncHandler(async (req, res) => {
    const websiteLinkId = req.user.websiteLinked

    if (true) {
        console.log(req?.files?.image)
        return res.status(200).json({ pass: "pass" })
    }
    let packageCreate = req.body;
    packageCreate.websiteLinked = websiteLinkId
    let packagelist = await packageDB.create(packageCreate);

    if (!packagelist) {
        return next(new ApiError(400, "Package Not added !"))
    }
    res.status(200).json(new ApiResponse(200, packagelist))
});

export const singlePackage = asyncHandler(async (req, res, next) => {
    const id = req.params.id

    let isValidId = mongoose.Types.ObjectId.isValid(id)
    if (!isValidId) {
        return next(new ApiError(400, "Not Valid Mongo Id"))
    }

    let packagelist = await packageDB.findById(id)

    if (!packagelist) {
        return next(new ApiError(400, "Package Not Found !"))
    }

    res.status(200).json(new ApiResponse(200, packagelist))
});

export const updatePackage = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const UpdateData = req.body

    let packagelist = await packageDB.findByIdAndUpdate(id, UpdateData, { new: true })

    if (packagelist == null) {
        return next(new ApiError(400, "Package Not Found and Unable to update !"))
    }

    res.status(200).json(new ApiResponse(200, packagelist))
});

export const deletePackage = asyncHandler(async (req, res, next) => {
    const id = req.params.id

    let packagelist = await packageDB.findByIdAndDelete(id);

    if (!packagelist) {
        return next(new ApiError(400, "Package not found !"))
    }

    res.status(200).json(new ApiResponse(200, "Package Delete Successfully !"))
});