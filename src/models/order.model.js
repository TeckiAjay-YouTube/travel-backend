import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    userLinked: {
        type: string,
        required: [true, "Please Enter username !"]
    },
    websiteLinked: {
        type: String,
        required: [true, "Please Enter username !"]
    },
    websiteInfo: {
        type: String,
        required: [true, "Please Enter your Full Name !"]
    },
    websiteDescription: {
        type: String,
    },
    websiteDomain: {
        type: String,
    },
    isStatus: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

export default new model("order", orderSchema);