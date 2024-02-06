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
      queryClient.invalidateQueries(["get-decor"]);
    },
    onError: () => {
      toast.error("error", { id: "adding-decor" });
    },
  });
  return { mutation };
};

export const useDeleteDecor = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-decor"],
    mutationFn: async (id: string) => {
      toast.loading("deleting", { id: "deleting-decor" });
      const data = (
        await axios.delete(`${baseUrl}/decor/delete`, {
          data: {
            id,
          },
        })
      ).data;
      return data;
    },
    onSuccess: () => {
      toast.success("successfull", { id: "deleting-decor" });
      queryClient.invalidateQueries(["get-decor"]);
    },
    onError: () => {
      toast.error("error", { id: "deleting-decor" });
    },
  });
  return { decorDelMutation: mutation };
};
