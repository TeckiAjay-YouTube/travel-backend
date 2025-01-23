import { Schema, model } from "mongoose";

const websiteSchema = new Schema({
    websiteName: {
        type: String,
        required: [true, "Please Enter website name !"]
    },
    websiteInfo: {
        type: String,
        required: [true, "Please Enter your website info!"]
    },
    websiteDescription: {
        type: String,
    },
    websiteDomain: {
        type: String,
        lowecase: true,
        trim: true,
        unique: true,
        required: [true, "Please Enter your website domain !"]
    },
    isStatus: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

export default new model("website", websiteSchema);