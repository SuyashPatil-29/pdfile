"use client";
import { SessionProvider } from "next-auth/react";
import React, { FC } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { NextUIProvider } from "@nextui-org/react";

interface ProviderProps {
  children: React.ReactNode;
}

const AllProviders: FC<ProviderProps> = ({ children }) => {
    const queryClient = new QueryClient();
  return (
    <SessionProvider>
        <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default AllProviders;
