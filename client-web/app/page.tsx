"use client";
import { Button } from "@/components/ui/button";
import { Theme_Toggle } from "@/components/theme-toggle";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

export default function Home() {
	const { user: me, logout } = useAuth();
	const router = useRouter();
	return (
		<main className={"grid place-content-center h-screen space-y-4"}>
			<Theme_Toggle />
			<h1>Hello {me ? me.username : "Guest"} from plot-wisp client</h1>
			{!!me ? (
				<Button onClick={() => logout()} variant={"outline"}>
					Logout
				</Button>
			) : (
				<Button onClick={() => router.push("/auth")} variant={"outline"}>
					Login
				</Button>
			)}
		</main>
	);
}
