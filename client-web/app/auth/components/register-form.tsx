"use client";
import { useGetRegisterStates } from "@/app/auth/hooks/auth.hooks";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Register_Form() {
	const { register_password, register_username, set_register_password, set_register_username, handle_register, set_register_gender, register_gender, error } = useGetRegisterStates();

	const handle_gender_change = (value: string) => {
		set_register_gender(value as "male" | "female" | "other");
	};

	const router = useRouter();
	return (
		<Card>
			<CardHeader>
				<CardTitle>Register</CardTitle>
				<CardDescription>Create a new account.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="space-y-1">
					<Label htmlFor="register-username">Username</Label>
					<Input id="register-username" value={register_username} onChange={e => set_register_username(e.target.value)} />
				</div>
				<div className="space-y-1">
					<Label htmlFor="register-password">Password</Label>
					<Input id="register-password" type="password" value={register_password} onChange={e => set_register_password(e.target.value)} />
				</div>
				<Select onValueChange={handle_gender_change} value={register_gender}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Gender" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="male">Male</SelectItem>
						<SelectItem value="female">Female</SelectItem>
						<SelectItem value="other">Other</SelectItem>
					</SelectContent>
				</Select>
				{!!error && <div className="text-red-400 font-bold text-sm">{error}</div>}
			</CardContent>
			<CardFooter>
				<Button onClick={() => handle_register(() => router.push("/"))}>Register</Button>
			</CardFooter>
		</Card>
	);
}
