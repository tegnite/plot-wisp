type ENV_KEYS_TYPE = "NEXT_PUBLIC_API_URL";

export const get_env = (key: ENV_KEYS_TYPE): string => {
	const value = process.env[key];
	if (!value) throw new Error("the evnironment variable" + key + " is not defined");
	return value;
};
