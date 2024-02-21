import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { ProjectCardProps, baseUrl } from "@/store";
import { Project } from "@prisma/client";
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

// get project by the id for dynamic page
export const useGetProjectById = (body: object) => {
  const query = useQuery({
    queryKey: ["get-project-by-id"],
    queryFn: async () => {
      const data = (
        await axios.post(`${baseUrl}/projects/getprojectbyid`, body)
      ).data;

      return data as { project: ProjectCardProps };
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
        `${baseUrl}/projects/addprojects`,
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
      toast.error(message ? message : "error", { id: "adding-project" });
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
    onError: () => {
      toast.error("error uploading image", { id: "uploading-image" });
    },
  });
  return { ...mutation, data: mutation.data };
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["deleted-project"],
    mutationFn: async (id: string) => {
      toast.loading("deleting project", { id: "deleting-project" });
      const data = (
        await axios.delete(`${baseUrl}/projects/deleteproject`, {
          data: { id },
        })
      ).data;
      return data;
    },
    onSuccess: () => {
      toast.success("deleted successfully", { id: "deleting-project" });
      queryClient.invalidateQueries({ queryKey: ["get-projects"] });
    },
    onError: () => {
      toast.error("Error", { id: "deleting-project" });
    },
  });
  return { ...mutation, data: mutation.data };
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-project"],
    mutationFn: async ({ id, body }: { id: string; body: object }) => {
      toast.loading("updating project", { id: "updating-data" });
      const data = (
        await axios.put(`${baseUrl}/projects/updateproject`, { id, ...body })
      ).data;

      return data;
    },
    onSuccess: () => {
      toast.success("successfull", { id: "updating-data" });
      queryClient.invalidateQueries({ queryKey: ["get-projects"] });
    },
    onError: () => {
      toast.error("error", { id: "updating-data" });
    },
  });

  return { mutation };
};
