import { useState } from "react";
import { type User_Interface } from "@/types/user.types";
import { fetcher } from "@/lib/fetcher";

export const get_login_states = () => {
	const [login_email, set_login_email] = useState("");
	const [login_password, set_login_password] = useState("");

	const handle_login = async () => {
		const { error } = await fetcher<User_Interface>("/api/auth/login", "POST", {
			email: login_email,
			password: login_password,
		});
		if (error) {
			alert(error);
		} else {
			alert("Login successful!");
		}
	};

	return {
		login_email,
		login_password,
		set_login_email,
		set_login_password,
		handle_login,
	};
};

export const get_register_states = () => {
	const [register_password, set_register_password] = useState("");
	const [register_username, set_register_username] = useState("");

	const handle_register = async () => {
		const { error, data } = await fetcher<User_Interface>("/api/auth/register", "POST", {
			password: register_password,
			username: register_username,
		});

		console.log("registered", data);
		if (error) {
			alert(error);
		} else {
			alert("Registration successful!");
		}
	};

	return {
		register_password,
		set_register_password,

		register_username,
		set_register_username,

		handle_register,
	};
};
