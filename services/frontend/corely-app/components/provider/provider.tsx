"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

function ErrorFallback({ error }: { error: unknown }) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return (
        <div className="p-4 bg-red-100 text-red-800">
            <h2 className="font-bold">Something went wrong:</h2>
            <pre>{message}</pre>
        </div>
    );
}

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}