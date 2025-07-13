import { useState } from "react";
import { type User_Interface } from "@/types/user.types";
import { fetcher } from "@/lib/fetcher.lib";

export const useGetLoginStates = () => {
	const [login_username, set_login_username] = useState<string>();
	const [login_password, set_login_password] = useState<string>("");
	const [error, set_error] = useState<string | null>(null);

	const handle_login = async (call_back: () => void = () => console.log("login success callback")) => {
		const { error: api_error } = await fetcher<User_Interface>("/api/auth/login", "POST", {
			username: login_username,
			password: login_password,
		});
		if (api_error) {
			set_error(api_error);
		} else {
			call_back();
		}
	};

	return {
		login_username,
		set_login_username,
		login_password,
		set_login_password,
		error,
		handle_login,
	};
};

export const useGetRegisterStates = () => {
	const [register_password, set_register_password] = useState<string>("");
	const [register_username, set_register_username] = useState<User_Interface["username"]>("");
	const [register_gender, set_register_gender] = useState<User_Interface["gender"]>("male");
	const [error, set_error] = useState<string | null>(null);

	const handle_register = async (call_back: () => void = () => console.log("register success callback")) => {
		set_error(null);
		const { error: api_error } = await fetcher<User_Interface>("/api/auth/register", "POST", {
			password: register_password,
			username: register_username,
			gender: register_gender,
		});

		if (api_error) {
			set_error(api_error);
		} else {
			call_back();
		}
	};

	return {
		register_password,
		set_register_password,

		register_username,
		set_register_username,

		register_gender,
		set_register_gender,

		error,

		handle_register,
	};
};
