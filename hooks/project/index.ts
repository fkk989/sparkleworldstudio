import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/store";
export const useGetProjects = () => {
  const query = useQuery({
    queryKey: ["get-projects"],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}/projects/getprojects`);

      return data;
    },
  });
  return { ...query, projectData: query.data };
};

// add projects
export const useAddProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["adding-project"],
    mutationFn: async (body: object) => {
      toast.loading("adding project", { id: "adding-project" });

      const { data } = await axios.post(
        "https://sparkleworldstudio.vercel.app/api/projects/addprojects",
        body
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-projects"] });
      toast.success("added successfully", { id: "adding-project" });
    },
    onError: (error) => {
      // @ts-ignore
      const message = error.response.data.message;
      toast.error(message, { id: "adding-project" });
    },
  });
  return { mutation, projectData: mutation.data };
};

export const useUploadToAws = () => {
  const mutation = useMutation({
    mutationKey: ["signed-url"],
    mutationFn: async (input: HTMLInputElement) => {
      toast.loading("uploading image", { id: "uploading-image" });
      const file: File | null | undefined = input.files?.item(0);
      if (!file) {
        return toast.error("please select a image", { id: "uploading-image" });
      }

      const { data } = await axios.post(`${baseUrl}/getsignedurl`, {
        imageType: `${file?.type.split("/")[1]}`,
      });
      return data;
    },
    onSuccess: async (data, input) => {
      const file: File | null | undefined = input.files?.item(0);

      if (!file) {
        return toast.error("please select a image", { id: "uploading-image" });
      }
      const res = await axios.put(data.url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (res.statusText === "OK") {
        toast.success("upload successfull", { id: "uploading-image" });
      }
    },
  });
  return { ...mutation, data: mutation.data };
};
