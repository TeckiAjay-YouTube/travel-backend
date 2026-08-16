import { Schema, model } from "mongoose";

const mediaSchema = new Schema({
    websiteLinked: {
        type: Schema.Types.ObjectId,
        ref: "websites",
        required: [true, "Please Enter website Linked !"]
    },
    title: {
        type: String,
        required: [true, "Please Enter your media Title !"]
    },
    description: {
        type: String,
        required: [true, "Please Enter your media Description !"]
    },
    publicURl: {
        type: String,
        required: [true, "Please add your public url !"]
    },
    privateURl: {
        type: String,
        required: [true, "Please add private url !"]
    },
    mediaFileName: {
        type: String,
        required: [true, "Please add media file name !"]
    },
    mediaSize: {
        type: String,
        required: [true, "Please added media size !"]
    },
    mediaType: {
        type: String,
        enum: ["Image", "Pdf"],
        required: [true, "Please select media type !"]
    },
    isStatus: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

export default new model("media", mediaSchema);