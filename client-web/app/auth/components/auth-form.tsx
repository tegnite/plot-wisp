"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetcher } from "@/lib/fetcher";
import { User_Interface } from "@/types/user.types";
import { useState } from "react";
import { get_login_states, get_register_states } from "@/app/auth/states/auth.states";

export function Auth_Form() {
	const { login_email, login_password, handle_login, set_login_email, set_login_password } = get_login_states();

	const { register_password, register_username, set_register_password, set_register_username, handle_register } = get_register_states();

	return (
		<Tabs defaultValue="login" className="w-[400px]">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="login">Login</TabsTrigger>
				<TabsTrigger value="register">Register</TabsTrigger>
			</TabsList>
			<TabsContent value="login">
				<Card>
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>Access your account.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="space-y-1">
							<Label htmlFor="login-email">Email</Label>
							<Input id="login-email" type="email" value={login_email} onChange={e => set_login_email(e.target.value)} />
						</div>
						<div className="space-y-1">
							<Label htmlFor="login-password">Password</Label>
							<Input id="login-password" type="password" value={login_password} onChange={e => set_login_password(e.target.value)} />
						</div>
					</CardContent>
					<CardFooter>
						<Button onClick={handle_login}>Login</Button>
					</CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value="register">
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
					</CardContent>
					<CardFooter>
						<Button onClick={handle_register}>Register</Button>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
