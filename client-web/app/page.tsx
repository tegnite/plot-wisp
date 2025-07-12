import { Button } from "@/components/ui/button";
import { Theme_Toggle } from "@/components/theme-toggle";
import { fetcher } from "@/lib/fetcher";
import { User_Interface } from "@/types/user.types";

export default async function Home() {
	const { data } = await fetcher<User_Interface[]>("/api/users", "GET");
	console.log(data);
	return (
		<main className={"grid place-content-center h-screen space-y-4"}>
			<Theme_Toggle />
			<h1>Hello World from plot-wisp client</h1>
			<Button variant={"outline"}>Click Me!!</Button>
		</main>
	);
}
