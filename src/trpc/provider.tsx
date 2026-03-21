"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { TRPCProvider } from "./client";
import { makeQueryClient } from "./query-client";
import type { AppRouter } from "./routers/_app";

let browserQueryClient: ReturnType<typeof makeQueryClient>;

function getQueryClient() {
	if (typeof window === "undefined") {
		return makeQueryClient();
	}

	if (!browserQueryClient) {
		browserQueryClient = makeQueryClient();
	}

	return browserQueryClient;
}

function getUrl() {
	if (typeof window !== "undefined") {
		return "/api/trpc";
	}

	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}/api/trpc`;
	}

	return "http://localhost:3000/api/trpc";
}

function TRPCReactProviderInner({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();
	const [trpcClient] = useState(() =>
		createTRPCClient<AppRouter>({
			links: [
				httpBatchLink({
					url: getUrl(),
				}),
			],
		}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
				{children}
			</TRPCProvider>
		</QueryClientProvider>
	);
}

export function TRPCReactProvider(props: { children: React.ReactNode }) {
	const [queryClient] = useState(() => makeQueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<TRPCReactProviderInner>{props.children}</TRPCReactProviderInner>
		</QueryClientProvider>
	);
}
