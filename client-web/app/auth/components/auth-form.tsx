"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Register_Form } from "./register-form";
import { Login_Form } from "./login-form";

export function Auth_Form() {
	return (
		<Tabs defaultValue="login" className="w-[400px]">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="login">Login</TabsTrigger>
				<TabsTrigger value="register">Register</TabsTrigger>
			</TabsList>
			<TabsContent value="login">
				<Login_Form />
			</TabsContent>
			<TabsContent value="register">
				<Register_Form />
			</TabsContent>
		</Tabs>
	);
}
