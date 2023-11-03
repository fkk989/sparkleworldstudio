import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/store";
import toast from "react-hot-toast";

export const useSendQuery = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["send-query"],
    mutationFn: async (body: Object) => {
      toast.loading("sending query", { id: "send-query" });
      const data = (await axios.post(`${baseUrl}/querie/send`, body)).data;

      return data;
    },
    onSuccess: () => {
      toast.success("sended", { id: "send-query" });
      queryClient.invalidateQueries(["get-queries"]);
    },
    onError: () => {
      toast.error("error", { id: "send-query" });
    },
  });

  return { mutation };
};

export const useGetQuries = () => {
  const query = useQuery({
    queryKey: ["get-queries"],
    queryFn: async () => {
      const data = (await axios.get(`${baseUrl}/querie/get`)).data;

      return data;
    },
  });

  return { ...query, queryData: query.data };
};

export const useDeleteQuery = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-query"],
    mutationFn: async (id: string) => {
      toast.loading("deleting", { id: "delete-query" });
      const data = (
        await axios.delete(`${baseUrl}/querie/delete`, { data: { id } })
      ).data;
      return data;
    },
    onSuccess: () => {
      toast.success("successfull", { id: "delete-query" });
      queryClient.invalidateQueries(["get-queries"]);
    },
    onError: () => {
      toast.error("error", { id: "delete-query" });
    },
  });
  return { mutation };
};
