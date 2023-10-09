"use client";

import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultAdmin = async () => {
    const res = (
      await axios.get(
        "https://sparkleworldstudio.vercel.app//api/admin/defaultadmin"
      )
    ).data;
  };
  useEffect(() => {
    defaultAdmin();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>{children}</RecoilRoot>
    </QueryClientProvider>
  );
};
