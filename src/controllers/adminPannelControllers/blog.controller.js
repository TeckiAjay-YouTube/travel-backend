import blogDB from "../../models/blog.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import mongoose from "mongoose";

export const getAllBlog = asyncHandler(async (req, res, next) => {
    const websiteLinkId = req.user.websiteLinked

    let packagelist = await blogDB.find({ websiteLinked: websiteLinkId });
    if (packagelist.length === 0) {
        return next(new ApiError(400, "No Blog Found !"))
    }
    res.status(200).json(new ApiResponse(200, packagelist))
});

export const addBlog = asyncHandler(async (req, res) => {
    const websiteLinkId = req.user.websiteLinked
    let packageCreate = req.body;
    packageCreate.websiteLinked = websiteLinkId
    let packagelist = await blogDB.create(packageCreate);

    if (!packagelist) {
        return next(new ApiError(400, "Blog Not added !"))
    }
    res.status(200).json(new ApiResponse(200, packagelist))
});

export const test = asyncHandler(async (req, res) => {
    console.log(req.body)
    res.status(200).json(new ApiResponse(200, "done"))
});

export const singleBlog = asyncHandler(async (req, res, next) => {
    const id = req.params.id

    let isValidId = mongoose.Types.ObjectId.isValid(id)
    if (!isValidId) {
        return next(new ApiError(400, "Not Valid Mongo Id"))
    }

    let packagelist = await blogDB.findById(id)

    if (!packagelist) {
        return next(new ApiError(400, "Blog Not Found !"))
    }

    res.status(200).json(new ApiResponse(200, packagelist))
});

export const updateBlog = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const UpdateData = req.body

    let packagelist = await blogDB.findByIdAndUpdate(id, UpdateData, { new: true })

    if (packagelist == null) {
        return next(new ApiError(400, "Blog Not Found and Unable to update !"))
    }

    res.status(200).json(new ApiResponse(200, packagelist))
});

export const deleteBlog = asyncHandler(async (req, res, next) => {
    const id = req.params.id

    let packagelist = await blogDB.findByIdAndDelete(id);

    if (!packagelist) {
        return next(new ApiError(400, "Blog not found !"))
    }

    res.status(200).json(new ApiResponse(200, "Blog Delete Successfully !"))
});