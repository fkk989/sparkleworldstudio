import { ProjectCardProps } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { date } from "zod";

export const useGetProjects = () => {
  const query = useQuery({
    queryKey: ["get-projects"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/projects/getprojects"
      );

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
        "http://localhost:3000/api/projects/addprojects",
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

      const { data } = await axios.post(
        "http://localhost:3000/api/getsignedurl",
        {
          imageType: `${file?.type.split("/")[1]}`,
        }
      );
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

/*



 const handleInputChange = async (input: HTMLInputElement) => {
    return async (e: Event) => {
      toast.loading("uploading image", { id: "uploading-image" });
      e.preventDefault();

      const file: File | null | undefined = input.files?.item(0);

      if (!file) return;

      const res = await fetch("http://localhost:3000/api/getsignedurl", {
        method: "POST",
        body: JSON.stringify({
          imageType: `${file?.type.split("/")[1]}`,
        }),
      });
      const data = await res.json();
      if (!data.success) return;

      const url = new URL(data.url);

      // uploading photo to aws
      const awsRes = await axios.put(data.url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (awsRes.statusText == "OK") {
        toast.success("uploaded successfully", { id: "uploading-image" });
      }

      const imgUrl = `${url.origin}${url.pathname}`;
      setImageUrl(imgUrl);
    };
  };

  const handleImgInput = async () => {
    const imgInput = document.createElement("input");
    imgInput.setAttribute("type", "file"),
      imgInput.setAttribute("accept", "image/*");
    const hadlerFn = await handleInputChange(imgInput);
    imgInput.addEventListener("change", hadlerFn);
    imgInput.click();
  };

  
*/
