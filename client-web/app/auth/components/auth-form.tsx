"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Register_Form } from "./register-form";
import { Login_Form } from "./login-form";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

export function Auth_Form() {
	const { refetch_user } = useAuth();
	const router = useRouter();
	const success_callback = async () => {
		await refetch_user();
		router.push("/");
	};
	return (
		<Tabs defaultValue="login" className="w-[400px]">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="login">Login</TabsTrigger>
				<TabsTrigger value="register">Register</TabsTrigger>
			</TabsList>
			<TabsContent value="login">
				<Login_Form success_callback={success_callback} />
			</TabsContent>
			<TabsContent value="register">
				<Register_Form success_callback={success_callback} />
			</TabsContent>
		</Tabs>
	);
}
