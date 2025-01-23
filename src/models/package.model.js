import { Schema, model } from "mongoose";

const packageSchema = new Schema({
    websiteLinked: {
        type: Schema.Types.ObjectId,
        ref: "websites",
        required: [true, "Please Enter website Linked !"]
    },
    title: {
        type: String,
        required: [true, "Please Enter your package Title !"]
    },
    description: {
        type: String,
        required: [true, "Please Enter your package Description !"]
    },
    image: {
        type: String,
        required: [true, "Please add your package image !"]
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