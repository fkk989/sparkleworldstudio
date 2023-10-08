"use client";

import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from "react";

import { isAdmin } from "@/store";
import axios from "axios";

export const Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultAdmin = async () => {
    const res = (
      await axios.get(
        "https://sparkleworldstudio.vercel.app/api/admin/defaultadmin"
      )
    ).data;
  };
  useEffect(() => {
    defaultAdmin();
  }, []);

  return <RecoilRoot>{children}</RecoilRoot>;
};
