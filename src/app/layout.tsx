import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui";

export const metadata: Metadata = {
	title: "devroast",
	description: "paste your code. get roasted.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="bg-[#0C0C0C]">
				<Navbar links={["leaderboard"]} />
				<main>{children}</main>
			</body>
		</html>
	);
}
