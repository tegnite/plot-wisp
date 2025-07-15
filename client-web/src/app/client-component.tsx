"use client";

export default function Client_Component() {
	const text = process.env.NEXT_PUBLIC_TEXT;
	return <div>client: {text}</div>;
}
