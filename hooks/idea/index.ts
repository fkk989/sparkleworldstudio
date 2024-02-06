import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/store";
import toast from "react-hot-toast";
import { Idea } from "@prisma/client";

export const useGetIdea = (type: string) => {
  const query = useQuery({
    queryKey: ["get-idea"],
    queryFn: async () => {
      const data = (await axios.post(`${baseUrl}/decorIdea/get`, { type }))
        .data;
      return data as { designIdeas: Idea[] };
    },
  });

  return { query, designIdeas: query.data?.designIdeas };
};
export const useGetIdeaById = (id: string) => {
  const query = useQuery({
    queryKey: ["get-idea-by-id"],
    queryFn: async () => {
      const data = (await axios.post(`${baseUrl}/decorIdea/getbyid`, { id }))
        .data;
      return data as { designIdea: Idea };
    },
  });

  return { query, designIdea: query.data?.designIdea };
};

export const useAddIdea = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-idea"],
    mutationFn: async (body: object) => {
      toast.loading("adding design idea", { id: "adding-idea" });
      const data = (await axios.post(`${baseUrl}/decorIdea/add`, body)).data;
      return data;
    },
    onSuccess: () => {
      toast.success("successfull", { id: "adding-idea" });
      queryClient.invalidateQueries(["get-idea"]);
    },
    onError: () => {
      toast.error("error", { id: "adding-idea" });
    },
  });
  return { mutation };
};

export const useDeleteIdea = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-decor"],
    mutationFn: async (id: string) => {
      toast.loading("deleting", { id: "deleting-idea" });
      const data = (
        await axios.delete(`${baseUrl}/decorIdea/delete`, {
          data: {
            id,
          },
        })
      ).data;
      return data;
    },
    onSuccess: () => {
      toast.success("successfull", { id: "deleting-idea" });
      queryClient.invalidateQueries(["get-idea"]);
    },
    onError: () => {
      toast.error("error", { id: "deleting-idea" });
    },
  });
  return { ideaDelMutation: mutation };
};
