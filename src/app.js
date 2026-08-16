import express from "express";
import userSuper from "./routes/superAdminRoutes/userSuper.routes.js";
import websiteSuper from "./routes/superAdminRoutes/websiteSuper.routes.js";
import userAdmin from "./routes/adminPannelRoutes/users.routes.js";
import packageAdmin from "./routes/adminPannelRoutes/package.routes.js";
import blogAdmin from "./routes/adminPannelRoutes/blog.routes.js";
import utilAdmin from "./routes/adminPannelRoutes/utils.routes.js";
import frontendUser from "./routes/userPannelRoutes/frontend.routes.js";
import cors from "cors";
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
import homepageRoute from "./routes/homepageRoutes.js";
import { fileURLToPath } from "url";
import path from "path";
import categoryRoutes from "./routes/adminPannelRoutes/category.routes.js";
import frontendCategory from "./routes/userPannelRoutes/category.routes.js";
import hikingStylerouter from "./routes/hikingStyleRoutes.js";
import tripPictureRoutes from "./routes/tripPictureRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import mediaRoutes from "./routes/adminPannelRoutes/media.routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: true,
    credentials: true,
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With"
    ]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
// Public files
app.use("/public",express.static(path.join(__dirname, "../public")));

// superadmin pannel routes
app.use("/apiSuper/v1/user/", userSuper);
app.use("/apiSuper/v1/website/", websiteSuper);
// admin
app.use("/apiAdmin/v1/user/", userAdmin);
app.use("/apiAdmin/v1/package/", packageAdmin);
app.use("/apiAdmin/v1/blog/", blogAdmin);
app.use("/apiAdmin/v1/utils/", utilAdmin);
app.use("/apiAdmin/v1/home/", homepageRoute);
app.use("/apiAdmin/v1/category/", categoryRoutes);
app.use("/apiAdmin/v1/hikingStyle/", hikingStylerouter);
app.use("/apiAdmin/v1/tripPicture/", tripPictureRoutes);
app.use("/apiAdmin/v1/testimonail/", testimonialRoutes);
app.use("/apiAdmin/v1/media/", mediaRoutes);

// user frontend
app.use("/apiUser/v1/frontend", frontendUser);
app.use("/apiUser/v1/category", frontendCategory);

// Catch-all for undefined routes
app.all("*", (req, res, next) => {
    next(new ApiError(404, `Not Available Path ${req.baseUrl} !`));
});

// Error handling
app.use(errors());
app.use(ErrorMiddleware);

export default app;
