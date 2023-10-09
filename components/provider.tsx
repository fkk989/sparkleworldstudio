"use client";

import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultAdmin = async () => {
    const res = (
      await axios.get("http://localhost:3000/api/admin/defaultadmin")
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
