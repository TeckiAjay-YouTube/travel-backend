import express from "express";
import userRoutes from "./routes/adminPannelRoutes/users.routes.js";
import cors from "cors";
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
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

// Admin pannel routes
app.use("/apiAdmin/v1/user/", userRoutes);

// Catch-all for undefined routes
app.all("*", (req, res, next) => {
    next(new ApiError(404, `Not Available Path ${req.baseUrl} !`));
});

// Error handling
app.use(errors());
app.use(ErrorMiddleware);

export default app;