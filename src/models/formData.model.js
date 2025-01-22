import { Schema, model } from "mongoose";

const formDataSchema = new Schema({
    userLinked: {
        type: string,
        required: [true, "Please Enter username !"]
    },
    websiteLinked: {
        type: String,
        required: [true, "Please Enter username !"]
    },
    name: {
        type: String,
        required: [true, "Please Enter your Full Name !"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your Full Name !"]
    },
    contactNumber: {
        type: String,
    },
    description: {
        type: String,
        required: [true, "Please Enter your Full Name !"]
    },
    isStatus: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

export default new model("formData", formDataSchema);