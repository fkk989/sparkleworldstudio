"use client";

import { useAddProject } from "@/hooks";
import { AddProjectCard } from "@/components";

// imput style
const inputStyle = `w-[100%] h-[50px] outline-none bg-transparent border-b border-[#23252d] placeholder:text-[#23252d] mobile:w-[90%]`;

export default function AddProject() {
  const { mutation, projectData } = useAddProject();
  return (
    <div>
      <AddProjectCard
        cardTitle="Add Project"
        submit={(reqBody) => {
          mutation.mutate(reqBody);
        }}
      />
    </div>
  );
}
