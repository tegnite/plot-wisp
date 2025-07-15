import Client_Component from "./client-component";

export default function Home() {
	const text = process.env.TEXT;
	return (
		<div className="w-screen h-screen flex flex-col gap-3 justify-center items-center">
			<div>server: {text}</div>
			<Client_Component />
		</div>
	);
}
