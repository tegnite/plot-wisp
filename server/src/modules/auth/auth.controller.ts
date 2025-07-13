import { Request, Response } from "express";
import { catch_async } from "@app/utils/catch-async.util";
import {
    User_Create_DTO,
    User_Login_DTO,
} from "@app/modules/users/users.types";
import { send_success_response } from "@app/utils/response.util";
import { Auth_Service } from "@app/modules/auth/auth.service";
import { get_env } from "@app/config/env.config";
import { CookieOptions } from "express";

function set_token_to_cookie(res: Response, token: string) {
    const is_production = get_env("NODE_ENV") === "production";
    const cookie_options: CookieOptions = {
        httpOnly: true,
        secure: is_production,
        sameSite: is_production ? "none" : "lax",
        maxAge: 172800000, // 2 days
    };

    res.cookie("token", token, cookie_options);
}

function get_cookie_options(): CookieOptions {
    const is_production = get_env("NODE_ENV") === "production";
    return {
        httpOnly: true,
        secure: is_production,
        sameSite: is_production ? "none" : "lax",
    };
}

export const Auth_Controller = {
    me: catch_async(async (req: Request, res: Response) => {
        const user_id = req.user_id;
        const { me, token } = await Auth_Service.get_me(user_id);
        set_token_to_cookie(res, token);
        send_success_response(res, me, {
            status_code: 201,
            message: "User authorized successfully from cookie token",
            token,
        });
    }),
    register: catch_async(async (req: Request, res: Response) => {
        const { user, token } = await Auth_Service.register_user(
            req.body as User_Create_DTO
        );
        set_token_to_cookie(res, token);
        send_success_response(res, user, {
            status_code: 201,
            message: "User registered successfully",
            token,
        });
    }),

    login: catch_async(async (req: Request, res: Response) => {
        const { user, token } = await Auth_Service.login_user(
            req.body as User_Login_DTO
        );
        set_token_to_cookie(res, token);
        send_success_response(res, user, {
            status_code: 200,
            message: "User login successfully",
            token,
        });
    }),

    logout: catch_async(async (_: Request, res: Response) => {
        res.clearCookie("token", get_cookie_options());
        send_success_response(res, null, {
            status_code: 200,
            message: "User logged out successfully",
        });
    }),
};
