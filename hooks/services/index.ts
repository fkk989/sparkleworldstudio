import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/store";
import { Services } from "@prisma/client";

export const useAddService = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["adding-service"],
    mutationFn: async (body: object) => {
      toast.loading("creating service", { id: "adding-service" });
      const { data } = await axios.post(
        `${baseUrl}/services/addservices`,
        body
      );

      return data;
    },
    onSuccess: () => {
      toast.success("created successfully", { id: "adding-service" });
      queryClient.invalidateQueries(["get-services"]);
    },
    onError: (error) => {
      // @ts-ignore
      const message = error.response.data.message;
      toast.error(message ? message : "error", { id: "adding-service" });
    },
  });
  return { mutation, serviceData: mutation.data };
};

export const useGetServices = () => {
  const query = useQuery({
    queryKey: ["get-services"],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}/services/getservices`);
      return data;
    },
  });

  return { ...query, data: query.data };
};
// get project by the id for dynamic page
export const useGetServiceById = (id: string) => {
  const query = useQuery({
    queryKey: ["get-project-by-id"],
    queryFn: async () => {
      const data = (
        await axios.post(`${baseUrl}/services/getservicebyid`, { id })
      ).data;

      return data as { service: Services };
    },
  });

  return { ...query, serviceData: query.data };
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["deleted-service"],
    mutationFn: async (id: string) => {
      toast.loading("deleting project", { id: "deleting-service" });
      const data = (
        await axios.delete(`${baseUrl}/services/deleteservice`, {
          data: { id },
        })
      ).data;
      return data;
    },
    onSuccess: () => {
      toast.success("deleted successfully", { id: "deleting-service" });
      queryClient.invalidateQueries({ queryKey: ["get-services"] });
    },
    onError: () => {
      toast.error("Error", { id: "deleting-service" });
    },
  });
  return { ...mutation };
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-service"],
    mutationFn: async ({
      serviceId,
      body,
    }: {
      serviceId: string;
      body: object;
    }) => {
      toast.loading("updating", { id: "updating-service" });
      const id = serviceId;
      const data = (
        await axios.put(`${baseUrl}/services/updateservie`, {
          id,
          ...body,
        })
      ).data;

      return data;
    },
    onSuccess: () => {
      toast.success("successfull", { id: "updating-service" });
      queryClient.invalidateQueries({ queryKey: ["get-projects"] });
    },
    onError: () => {
      toast.error("error", { id: "updating-service" });
    },
  });

  return { mutation };
};
