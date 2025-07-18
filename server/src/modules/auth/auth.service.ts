import {
    User_Create_DTO,
    User_Interface,
    User_Login_DTO,
} from "@app/modules/users/users.types";
import { get_env } from "@app/config/env.config";
import jwt from "jsonwebtoken";
import { User_Repository } from "@app/modules/users/users.repository";
import bcrypt from "bcryptjs";
import { Auth_Repository } from "@app/modules/auth/auth.respository";

const get_token_from_user = (user_data: User_Interface, secret : string): string => {
    return jwt.sign({ id: user_data._id }, secret, { expiresIn: "2d" });
};

const validate_username = (username: string) => {
    if (!username) {
        throw new Error("Username is required");
    }
    if (username.length < 4) {
        throw new Error("Username must be at least 4 characters long");
    }
    if (/\s/.test(username)) {
        throw new Error("Username cannot contain spaces");
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        throw new Error(
            "Username can only contain letters, numbers, dashes, and underscores"
        );
    }
};

const validate_password = (password: string) => {
    if (!password) {
        throw new Error("Password is required");
    }
    if (password.length < 8) {
        throw new Error("password must have at least 8 characters");
    }
};

export const Auth_Service = {
    async register_user(
        user_data: User_Create_DTO
    ): Promise<{ user: User_Interface; token: string }> {
        validate_username(user_data.username);
        validate_password(user_data.password);
        const old_user = await User_Repository.find_user_by_username(
            user_data.username
        );
        if (old_user) {
            throw new Error("user with this username already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(user_data.password, salt);

        const user = await Auth_Repository.create_user_in_db({
            ...user_data,
            password: password_hash,
        });
        const token = get_token_from_user(user, get_env("JWT_SECRET"));
        return { user, token };
    },

    async login_user(
        user_data: User_Login_DTO
    ): Promise<{ user: User_Interface; token: string }> {
        const user = await User_Repository.find_user_by_username(
            user_data.username
        );

        if (!user) {
            throw new Error("user with that username does not exist");
        }

        const is_match = await bcrypt.compare(
            user_data.password,
            user.password
        );

        if (!is_match) {
            throw new Error("invalid password");
        }

        const token = get_token_from_user(user, get_env("JWT_SECRET"));
        return { user, token };
    },

    async get_me(
        user_id: string | null | undefined
    ): Promise<{ me: User_Interface; token: string }> {
        if (!user_id) throw new Error("unauthorized");
        const user = await User_Repository.find_user_by_id(user_id);
        if (!user) throw new Error("unauthorized");
        const token = get_token_from_user(user, get_env("JWT_SECRET"));
        return {
            me: user,
            token,
        };
    },
};
