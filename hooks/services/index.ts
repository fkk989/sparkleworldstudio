import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/store";
import { Services } from "@prisma/client";

export const useAddService = () => {
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
