const ENV_KEYS = {
	client_api_url: "NEXT_PUBLIC_API_URL",
	server_api_url: "API_URL",
} as const;

export const get_env = (key: keyof typeof ENV_KEYS): string => {
	let value: string | undefined;
	const actual_key = ENV_KEYS[key];

	switch (actual_key) {
		case "NEXT_PUBLIC_API_URL":
			value = process.env.NEXT_PUBLIC_API_URL;
			break;
		case "API_URL":
			value = process.env.API_URL;
			break;
		default:
			value = undefined;
	}

	if (!value) throw new Error("the environment variable " + key + " is not defined");
	return value;
};
