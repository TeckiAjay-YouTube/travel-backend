import express from "express";
import userSuper from "./routes/superAdminRoutes/userSuper.routes.js";
import websiteSuper from "./routes/superAdminRoutes/websiteSuper.routes.js";
import userAdmin from "./routes/adminPannelRoutes/users.routes.js";
import packageAdmin from "./routes/adminPannelRoutes/package.routes.js";
import utilAdmin from "./routes/adminPannelRoutes/utils.routes.js";
import frontendUser from "./routes/userPannelRoutes/frontend.routes.js";
import cors from "cors";
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";

const app = express();

// Middleware for CORS
const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// superadmin pannel routes
app.use("/apiSuper/v1/user/", userSuper);
app.use("/apiSuper/v1/website/", websiteSuper);
// admin
app.use("/apiAdmin/v1/user/", userAdmin);
app.use("/apiAdmin/v1/package/", packageAdmin);
app.use("/apiAdmin/v1/utils/", utilAdmin);
app.use("/apiAdmin/v1/utils/", utilAdmin);
// user frontend
app.use("/apiUser/v1/frontend", frontendUser);

// Catch-all for undefined routes
app.all("*", (req, res, next) => {
    next(new ApiError(404, `Not Available Path ${req.baseUrl} !`));
});

// Error handling
app.use(errors());
app.use(ErrorMiddleware);

export default app;