import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    websiteLinked: {
        type: Schema.Types.ObjectId,
        ref: "websites",
        required: [true, "Please Enter website Linked !"]
    },
    title: {
        type: String,
        required: [true, "Please Enter your Blog Title !"]
    },
    description: {
        type: String,
        required: [true, "Please Enter your Blog Description !"]
    },
    image: {
        type: String,
        required: [true, "Please add your Blog image !"]
    },
    slug: {
        type: String,
        trim: true,
        required: [true, "Please add your Blog slug!"]
    },
    slugContent: {
        type: String,
        required: [true, "Please add your Blog slug content!"]
    },
    category: {
        type: String,
        required: [true, "Please add your Blog category!"]
    },
    extraField: {
        type: String,
    },
    isStatus: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

export default new model("blog", blogSchema);