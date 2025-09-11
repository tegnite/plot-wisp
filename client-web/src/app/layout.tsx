import type { Metadata } from "next";
import { Theme_Provider } from "@/components/general/theme-provider";
import "./globals.css";
import { Mode_Toggle } from "@/components/general/Mode-Toggle";

export const metadata: Metadata = {
	title: "Plot Wisp",
	description: "story website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`font-sans antialiased`}>
				<Theme_Provider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					
                        
						<Mode_Toggle />
					
					{children}
				</Theme_Provider>
			</body>
		</html>
	);
}
