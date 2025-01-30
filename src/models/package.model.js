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
    price: {
        type: String,
        required: [true, "Please add your package price !"]
    },
    duration: {
        type: String,
        required: [true, "Please add your package duration !"]
    },
    pickUpPoint: {
        type: String,
        required: [true, "Please add your package pickup location !"]
    },
    dropPoint: {
        type: String,
        required: [true, "Please add your package drop Location !"]
    },
    pdf: {
        type: String,
    },
    slug: {
        type: String,
    },
    slugContent: {
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