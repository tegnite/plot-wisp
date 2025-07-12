import { get_env } from "@/config/env.config";
import { Api_Response_Type } from "@/types/api-response.types";

export const fetcher = async <K>(url: string, method: HTTP_METHOD_TYPE, body?: object | FormData): Promise<{ error: null | string; data: K | null }> => {
	try {
		const base_url = get_env("NEXT_PUBLIC_API_URL");
		const full_url = `${base_url}${url}`;
		console.log("full url", full_url);

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
