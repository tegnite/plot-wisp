import express from "express";
import cookieParser from "cookie-parser";
import auth_routes from "@app/modules/auth/auth.routes";
import { error_middleware } from "@app/middlewares/error.middleware";
import { auth_middleware } from "@app/middlewares/auth.middleware";
import user_routes from "@app/modules/users/users.routes";
import cors from "cors";
import { get_env } from "./env.config";

const app = express();
const client_web_origin = get_env("CLIENT_WEB_ORIGIN");
app.use(
    cors({
        origin: client_web_origin,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(auth_middleware);

app.use("/api/auth", auth_routes);
app.use("/api/users", user_routes);

app.get("/", (_, res) => {
    res.send("Hello world! form plot-wisp backend!");
});

// Error handling middleware
app.use(error_middleware);
export default app;
