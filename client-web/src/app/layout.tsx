import type { Metadata } from "next";
import { Theme_Provider } from "@/components/general/theme-provider";
import "./globals.css";
import { Mode_Toggle } from "@/components/general/Mode-Toggle";

export const metadata: Metadata = {
	title: "Plot Wisp",
	description: "story website",
	keywords: "plot, wisp, story, website",
	publisher: "Plot Wisp",
	authors: [{ name: "Plot Wisp" }],
	creator: "Plot Wisp",
	openGraph: {
		title: "Plot Wisp",
		description: "story website",
		url: "https://plotwisp.com",
		siteName: "Plot Wisp",
		images: [
			{
				url: "",
				width: 1200,
				height: 630,
				alt: "Plot Wisp",
			},
		],
		type: "website",
		locale: "en_US",
	},
	twitter: {
		title: "Plot Wisp",
		description: "story website",
		card: "summary_large_image",
		site: "@plotwisp",
		creator: "@plotwisp",
		images: [
			{
				url: "",
				width: 1200,
				height: 630,
				alt: "Plot Wisp",
			},
		],
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	facebook: {
		appId: "", // Replace with your actual Facebook App ID
	},
	verification: {
		google: "google-site-verification-code", // Replace with your actual Google verification code
		yandex: "yandex-site-verification-code", // Replace with your actual Yandex verification code
	},
	
	
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
