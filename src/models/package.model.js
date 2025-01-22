import { Schema, model } from "mongoose";

const packageSchema = new Schema({
    websiteLinked: {
        type: String,
        required: [true, "Please Enter username !"]
    },
    title: {
        type: String,
        required: [true, "Please Enter your Full Name !"]
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    pdf: {
        type: String,
    },
    redirectLink: {
        type: String,
    },
    extraField: {
        type: String,
    },
    isStatus: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

export default new model("package", packageSchema);