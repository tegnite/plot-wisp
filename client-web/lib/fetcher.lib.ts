import { get_env } from "@/config/env.config";
import { Api_Response_Type } from "@/types/api-response.types";

export const fetcher = async <K>(url: string, method: HTTP_METHOD_TYPE, body?: object | FormData): Promise<{ error: null | string; data: K | null }> => {
	try {
		const base_url = typeof window === "undefined" ? get_env("server_api_url") : get_env("client_api_url");

		const full_url = `${base_url}${url}`;

		const fetch_options: RequestInit = {
			method,
			credentials: "include",
		};

		if (method !== "GET" && body) {
			fetch_options.body = body instanceof FormData ? body : JSON.stringify(body);
			fetch_options.headers = {
				"Content-Type": body instanceof FormData ? "multipart/form-data" : "application/json",
			};
		}
		console.log("fetcher", fetch_options, full_url, method);

		const response = await fetch(full_url, fetch_options);
		console.log("response", response);
		const data: Api_Response_Type<K> = await response.json();
		console.log("response data", data);

		if (response.ok && data.status === "success") {
			return { error: null, data: data.data };
		} else {
			return { error: data.message, data: null };
		}
	} catch (e) {
		console.warn(e);
		return { error: (e as Error).message, data: null };
	}
};

type HTTP_METHOD_TYPE = "GET" | "PUT" | "DELETE" | "POST";
