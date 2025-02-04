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

// Generation trxToken for Transaction
const generateTrxAuthToken = (memberId, trxPassword) => {
    let data = {
        memberId,
        trxPassword
    }
    let jsonToString = JSON.stringify(data);
    let sha256Generate = createHash('sha256').update(jsonToString).digest('hex');
    return sha256Generate;
}

export const getUser = asyncHandler(async (req, res, next) => {
    let websiteId = req?.user?.websiteLinked;
    let user = await userDB.find({ websiteLinked: websiteId })

    if (user.length === 0) {
        next(new ApiError(400, "No user Found !"))
    }
    res.status(200).json(new ApiResponse(200, user))
});

export const addUser = asyncHandler(async (req, res) => {
    let storeData = req.body;
    let date = new Date().getTime()
    storeData.userName = `T${date}`
    storeData.websiteLinked = req.websiteLinked;

    await userDB.create(storeData).then((data) => {
        res.status(201).json(new ApiResponse(201, "User Created Succesfully !"))
    }).catch((err) => {
        res.status(500).json({ message: "Failed", data: err.message })
    })
});

export const loginUser = asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    let user = await userDB.aggregate([{ $match: { email: email, password: password, isRole: "Admin" } }, { $project: { "_id": 1, "userName": 1, "websiteLinked": 1, "isRole": 1, "isStatus": 1 } }])
    if (!user?.length) {
        return res.status(404).json({ message: "Failed", data: "Invalid Credential Try Again !" })
    }

    if (user[0]?.isStatus !== true) {
        return res.status(404).json({ message: "Failed", data: "User Status is Not Active !" })
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