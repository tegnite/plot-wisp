"use client";
import { useGetLoginStates } from "@/app/auth/hooks/auth.hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function Login_Form() {
	const { login_username, login_password, handle_login, set_login_username, set_login_password, error } = useGetLoginStates();
	const router = useRouter();
	return (
		<Card>
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>Access your account.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="space-y-1">
					<Label htmlFor="login-username">Username</Label>
					<Input id="login-username" type="text" value={login_username} onChange={e => set_login_username(e.target.value)} />
				</div>
				<div className="space-y-1">
					<Label htmlFor="login-password">Password</Label>
					<Input id="login-password" type="password" value={login_password} onChange={e => set_login_password(e.target.value)} />
				</div>
				{!!error && <div className="text-red-400 font-bold text-sm">{error}</div>}
			</CardContent>
			<CardFooter>
				<Button onClick={() => handle_login(() => router.push("/"))}>Login</Button>
			</CardFooter>
		</Card>
	);
}
