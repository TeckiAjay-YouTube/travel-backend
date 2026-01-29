import packageDB from "../../models/package.model.js"
import blogDB from "../../models/blog.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import mongoose from "mongoose";

export const getPackageInfo = asyncHandler(async (req, res, next) => {
    const websiteLinkId = req.query.websiteId;
    const slug = req.params.slug;

    let isValidId = mongoose.Types.ObjectId.isValid(websiteLinkId)
    if (!isValidId) {
        return next(new ApiError(400, "Not Valid Website Id"))
    }
    let packagelist = await packageDB.find({ websiteLinked: websiteLinkId, isStatus: true, slug: slug });
    if (packagelist.length === 0) {
        return next(new ApiError(400, "No Package Found !"))
    }
    res.status(200).json(new ApiResponse(200, packagelist))
});

export const getAllPackageUser = asyncHandler(async (req, res, next) => {
    const websiteLinkId = req.query.websiteId;

    let isValidId = mongoose.Types.ObjectId.isValid(websiteLinkId)
    if (!isValidId) {
        return next(new ApiError(400, "Not Valid Website Id"))
    }
    let packagelist = await packageDB.find({ websiteLinked: websiteLinkId, isStatus: true }, { "_id": 1, "title": 1, "description": 1, "image": 1, "price": 1, "duration": 1, "pickUpPoint": 1, "dropPoint": 1, "pdf": 1, "slug": 1, "isStatus": 1, "createdAt": 1, "updatedAt": 1 });
    if (packagelist.length === 0) {
        return next(new ApiError(400, "No Package Found !"))
    }
    res.status(200).json(new ApiResponse(200, packagelist))
});

export const getBlogInfo = asyncHandler(async (req, res, next) => {
    const websiteLinkId = req.query.websiteId;
    const slug = req.params.slug;

    let isValidId = mongoose.Types.ObjectId.isValid(websiteLinkId)
    if (!isValidId) {
        return next(new ApiError(400, "Not Valid Website Id"))
    }
    let packagelist = await blogDB.find({ websiteLinked: websiteLinkId, isStatus: true, slug: slug });
    if (packagelist.length === 0) {
        return next(new ApiError(400, "No Blog Found !"))
    }
    res.status(200).json(new ApiResponse(200, packagelist))
});

export const getAllBlogUser = asyncHandler(async (req, res, next) => {
    const websiteLinkId = req.query.websiteId;

    let isValidId = mongoose.Types.ObjectId.isValid(websiteLinkId)
    if (!isValidId) {
        return next(new ApiError(400, "Not Valid Website Id"))
    }
    let packagelist = await blogDB.find({ websiteLinked: websiteLinkId, isStatus: true }, { "_id": 1, "title": 1, "description": 1, "image": 1, "slug": 1, "category": 1, "isStatus": 1, "createdAt": 1, "updatedAt": 1 });
    if (packagelist.length === 0) {
        return next(new ApiError(400, "No Blog Found !"))
    }
    res.status(200).json(new ApiResponse(200, packagelist))
});