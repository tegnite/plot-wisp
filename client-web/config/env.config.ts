type ENV_KEYS_TYPE = "NEXT_PUBLIC_API_URL";

export const get_env = (key: ENV_KEYS_TYPE): string => {
	console.log("key", key);
	let value: string | undefined;

	switch (key) {
		case "NEXT_PUBLIC_API_URL":
			value = process.env.NEXT_PUBLIC_API_URL;
			break;
		default:
			value = undefined;
	}

	console.log("value", value);
	console.log("manual 1", process.env["NEXT_PUBLIC_API_URL"]);
	console.log("manual 2", process.env.NEXT_PUBLIC_API_URL);
	if (!value) throw new Error("the environment variable " + key + " is not defined");
	return value;
};
