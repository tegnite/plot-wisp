import express from "express";
import cookieParser from "cookie-parser";
import auth_routes from "@app/modules/auth/auth.routes";
import { error_middleware } from "@app/middlewares/error.middleware";
import user_routes from "@app/modules/users/users.routes";
import { story_routes } from "@app/modules/stories/stories.routes";
import cors from "cors";
import { get_env } from "@app/config/env.config";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.set("trust proxy", 1); // Trust first proxy
const client_web_origin = get_env("CLIENT_WEB_ORIGIN");

app.use(
    cors({
        origin: client_web_origin,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", auth_routes);
app.use("/api/users", user_routes);
app.use("/api/stories", story_routes);

app.get("/", (_, res) => {
    res.send("hello form plot-wisp backend!");
});

// Error handling middleware
app.use(error_middleware);
export default app;
