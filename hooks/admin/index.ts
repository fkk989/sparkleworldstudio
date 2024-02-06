import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "@/store";

// admion login query
export const useAdminLogin = (body: object) => {
  const query = useQuery({
    queryKey: ["admin-login"],
    queryFn: async () => {
      toast.loading("login in", {
        id: "admin-login",
      });
      const data = (await axios.post(`${baseUrl}/admin/login`, body)).data;
      return data;
    },
    enabled: false,
  });

  return { ...query, data: query.data };
};

// get  admin if token is present
export const useGetAdmin = () => {
  const query = useQuery({
    queryKey: ["get-admin"],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}/getAdmin`);
      return data;
    },
  });

  return { ...query, admin: query.data };
};

// add admin mutation
export const useAddAdmin = () => {
  const mutation = useMutation({
    mutationKey: ["adding-admin"],
    mutationFn: async (body: object) => {
      toast.loading("Creating Admin", { id: "creating-admin" });
      const data = await axios.post(`${baseUrl}/admin/addadmin`, body);
      return data;
    },
    onError: (error) => {
      // @ts-ignore
      const message = error.response.data.message;
      toast.error(message ? message : "error", { id: "creating-admin" });
    },
    onSuccess: ({ data }) => {
      toast.success("successfully created", { id: "creating-admin" });
    },
  });

  return { ...mutation, admin: mutation.data };
};
