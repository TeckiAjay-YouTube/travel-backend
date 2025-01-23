import userDB from "../../models/users.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
// import bcrypt from "bcrypt"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

// Generation accessToken and refereshToken
const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await userDB.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

export const getUser = asyncHandler(async (req, res, next) => {
    let user = await userDB.find()
    if (user.length === 0) {
        return next(new ApiError(400, "No user Avabile !"))
    }
    res.status(200).json(new ApiResponse(200, user))

});

export const addUser = asyncHandler(async (req, res) => {
    let storeData = req.body;
    let date = new Date().getTime()
    storeData.userName = `T${date}`

    await userDB.create(storeData).then((data) => {
        res.status(201).json(new ApiResponse(201, "User Created Succesfully !"))
    }).catch((err) => {
        res.status(500).json({ message: "Failed", data: err.message })
    })
});

export const updateUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const UpdateData = req.body

    let user = await userDB.findByIdAndUpdate(id, UpdateData, { new: true })

    if (user == null) {
        return next(new ApiError(400, "User Not Found and Unable to update !"))
    }

    res.status(200).json(new ApiResponse(200, user))
});

export const deleteUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id

    let user = await userDB.findByIdAndDelete(id)

    if (user == null) {
        return next(new ApiError(400, "User Not Found and Unable to delete !"))
    }

    res.status(200).json(new ApiResponse(200, "User Delete Successfully !"))
});

export const register = asyncHandler(async (req, res) => {
    let storeData = req.body;
    let date = new Date().getTime()
    storeData.userName = `S${date}`

    if (storeData?.secureKey !== "ajay@9587") {
        return res.status(400).json({ message: "Failed", data: "Invalid Secure Key !" })
    }

    await userDB.create(storeData).then((data) => {
        res.status(201).json(new ApiResponse(201, "User Created Succesfully !"))
    }).catch((err) => {
        res.status(500).json({ message: "Failed", data: err.message })
    })
});

export const changePassword = asyncHandler(async (req, res) => {
    let storeData = req.body;

    let userInfo = await userDB.findById(storeData?.userId)

    if (!userInfo) {
        return res.status(400).json(new ApiError(400, "User Not found !"))
    }

    await userDB.findByIdAndUpdate(storeData?.userId, {}).then((data) => {
        res.status(201).json(new ApiResponse(201, "User Created Succesfully !"))
    }).catch((err) => {
        res.status(500).json({ message: "Failed", data: err.message })
    })
});

export const loginUser = asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    let user = await userDB.aggregate([{ $match: { email: email, password: password, isRole: "SuperAdmin" } }, { $project: { "_id": 1, "userName": 1, "email": 1, "isRole": 1, "isStatus": 1 } }])

    if (!user?.length) {
        return res.status(404).json({ message: "Failed", data: "Invalid Credential Try Again !" })
    }

    if (user[0]?.isStatus !== true) {
        return res.status(404).json({ message: "Failed", data: "User Status is Not Active" })
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user[0]._id)
    let options = { httpOnly: true, secure: true }
    let storeValue = { user: user[0], accessToken, refreshToken }
    return res.cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).status(200).json(
        new ApiResponse(200, storeValue, "User logged In Successfully")
    )

});

export const logOutUser = asyncHandler(async (req, res) => {
    let userInfo = await userDB.findById(req.user._id);
    userInfo.refreshToken = undefined;
    await userInfo.save();
    res.clearCookie("accessToken").clearCookie("refreshToken").status(200).json(new ApiResponse(200, null, "User logged Out Successfully"))
});