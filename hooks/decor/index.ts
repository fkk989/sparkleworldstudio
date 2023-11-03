import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/store";
import toast from "react-hot-toast";
import { DecorMenu } from "@prisma/client";

export const useGetDecor = () => {
  const query = useQuery({
    queryKey: ["get-decor"],
    queryFn: async () => {
      const data = (await axios.get(`${baseUrl}/decor/get`)).data;
      return data as { decorMenu: DecorMenu[] };
    },
  });

  return { query, decorData: query.data?.decorMenu };
};

export const useAddDecor = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-decor"],
    mutationFn: async (body: object) => {
      toast.loading("adding decor", { id: "adding-decor" });
      const data = (await axios.post(`${baseUrl}/decor/add`, body)).data;
      return data;
    },
    onSuccess: () => {
      toast.success("successfull", { id: "adding-decor" });
    },
    onError: () => {
      toast.error("error", { id: "adding-decor" });
      queryClient.invalidateQueries(["get-decor"]);
    },
  });
  return { mutation };
};
