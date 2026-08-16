import mediaDB from "../../models/media.model.js"
import fs from "fs";
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import mongoose from "mongoose";

export const getAllMedia = asyncHandler(async (req, res, next) => {
    const websiteLinkId = req.user.websiteLinked
    let medialist = await mediaDB.find({ websiteLinked: websiteLinkId });
    if (medialist.length === 0) {
        return next(new ApiError(400, "No Media Found !"))
    }
    res.status(200).json(new ApiResponse(200, medialist))
});

export const addMedia = asyncHandler(async (req, res) => {
    const websiteLinkId = req.user.websiteLinked
    const { title, description } = req.body;
    const imageFile = req?.files?.image?.[0];

    if (!imageFile) {
        return next(new ApiError(400, "upload the image !"))
    }

    // File information
    const mediaFileName = imageFile?.filename;
    const mediaPath = imageFile?.path;
    const mediaSize = String(imageFile?.size);
    const mediaType = "Image";

    // Public URL
    const publicURl = `https://api.yatrakarotravels.com/public/images/${mediaFileName}`;

    let mediaData = {
        websiteLinked: websiteLinkId,
        title: title,
        description: description,
        publicURl: publicURl,
        privateURl: mediaPath,
        mediaFileName: mediaFileName,
        mediaSize: mediaSize,
        mediaType: mediaType
    }

    let mediaAdded = await mediaDB.create(mediaData);

    if (!mediaAdded) {
        return next(new ApiError(400, "Media Not added !"))
    }
    res.status(200).json(new ApiResponse(200, mediaAdded))
});

export const singleMedia = asyncHandler(async (req, res, next) => {
    const id = req.params.id

    let isValidId = mongoose.Types.ObjectId.isValid(id)
    if (!isValidId) {
        return next(new ApiError(400, "Not Valid Mongo Id"))
    }

    let medialist = await mediaDB.findById(id)

    if (!medialist) {
        return next(new ApiError(400, "Media Not Found !"))
    }

    res.status(200).json(new ApiResponse(200, medialist))
});

export const updateMedia = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const UpdateData = req.body

    let packagelist = await mediaDB.findByIdAndUpdate(id, UpdateData, { new: true })

    if (packagelist == null) {
        return next(new ApiError(400, "Package Not Found and Unable to update !"))
    }

    res.status(200).json(new ApiResponse(200, packagelist))
});

export const deleteMedia = asyncHandler(async (req, res, next) => {
    const id = req.params.id

    let medialist = await mediaDB.findById(id);

    if (!medialist) {
        return next(new ApiError(400, "Media not found !"))
    }
    
    // Delete physical file
    if (medialist.privateURl && fs.existsSync(medialist.privateURl)) {
        fs.unlinkSync(medialist.privateURl);
    }

    // Delete MongoDB document
    await mediaDB.findByIdAndDelete(id);

    res.status(200).json(new ApiResponse(200, "Media Delete Successfully !"))
});