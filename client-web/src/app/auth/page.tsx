export default async function Home() {
	const url = process.env.API_URL;
	const response = await fetch(url as string);
	const data = await response.json();
	console.log("data", data);
	return <div className="w-screen h-screen flex flex-col gap-3 justify-center items-center">Auth page</div>;
}
