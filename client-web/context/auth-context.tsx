"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetcher } from "@/lib/fetcher.lib";
import { User_Interface } from "@/types/user.types";

interface Auth_Context_Type {
	user: User_Interface | null;
	is_loading: boolean;
	error: string | null;
	refetch_user: () => void;
	logout: (call_back?: () => void) => void;
}

const Auth_Context = createContext<Auth_Context_Type | undefined>(undefined);

export const Auth_Context_Provider = ({ children }: { children: ReactNode }) => {
	const [user, set_user] = useState<User_Interface | null>(null);
	const [is_loading, set_is_loading] = useState<boolean>(true);
	const [error, set_error] = useState<string | null>(null);

	const fetch_user = async () => {
		set_is_loading(true);
		set_error(null);
		const { data, error: api_error } = await fetcher<User_Interface>("/api/auth/me", "POST");

		if (api_error) {
			set_error(api_error);
			set_user(null);
		} else if (data) {
			set_user(data);
		}
		set_is_loading(false);
	};

	const logout = async (call_back: () => void = () => console.log("logout callback")) => {
		set_is_loading(true);
		set_error(null);
		const { error: api_error } = await fetcher<null>("/api/auth/logout", "POST");
		if (api_error) {
			set_error(api_error);
		} else {
			set_user(null);
			call_back();
		}
	};

	useEffect(() => {
		fetch_user();
	}, []);

	const refetch_user = () => {
		fetch_user();
	};

	const value = { user, is_loading, error, refetch_user, logout };

	return <Auth_Context.Provider value={value}>{children}</Auth_Context.Provider>;
};

export const useAuth = () => {
	const context = useContext(Auth_Context);
	if (context === undefined) {
		throw new Error("useAuth must be used within an Auth_Context_Provider");
	}
	return context;
};
