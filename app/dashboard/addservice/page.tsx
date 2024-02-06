"use client";
import { AddServiceCard } from "@/components";
import { useAddService } from "@/hooks";

export default function AddService() {
  const { mutation, serviceData } = useAddService();

  return (
    <div>
      <AddServiceCard
        title="Add Service"
        submit={(body) => {
          mutation.mutate(body);
        }}
      />
    </div>
  );
}
