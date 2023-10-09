import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useAddService = () => {
  const mutation = useMutation({
    mutationKey: ["adding-service"],
    mutationFn: async (body: object) => {
      toast.loading("creating service", { id: "adding-service" });
      const { data } = await axios.post(
        "http://localhost:3000/api/services/addservices",
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

      toast.error(message, { id: "adding-service" });
    },
  });
  return { mutation, serviceData: mutation.data };
};
