"use client";

import { useEffect, useState } from "react";

export default function Client_Component() {
	const [message, set_message] = useState<string>("");

	useEffect(() => {
		const url = process.env.NEXT_PUBLIC_API_URL;
		const get_message = async () => {
			const response = await fetch(url as string);
			const data = await response.json();
			set_message(data.message as string);
		};
		get_message();
	}, []);
	return <div>message from server(client component): {message}</div>;
}
