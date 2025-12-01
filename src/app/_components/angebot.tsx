"use client";

import { api } from "@/trpc/react";

export function AlleAngebote() {
  const [angebote] = api.post.getAll.useSuspenseQuery();

  return (
    <div>
      {angebote.map((x) => (
        <div key={x.id}>{x.title}</div>
      ))}
    </div>
  );
}
