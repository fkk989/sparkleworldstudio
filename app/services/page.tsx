"use client";

export default function Services() {
  return (
    <div>
      <div>This is services page</div>
    </div>
  );
}

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";
