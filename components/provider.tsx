"use client";

import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { baseUrl } from "@/store";
const queryClient = new QueryClient();

export const Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultAdmin = async () => {
    const res = (await axios.get(`${baseUrl}/admin/defaultadmin`)).data;
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
