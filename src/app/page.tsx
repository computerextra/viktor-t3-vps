import Link from "next/link";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { AlleAngebote } from "./_components/angebot";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getAll.prefetch();
  }

  return (
    <HydrateClient>
      <main>
        <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
          {session ? "Abmelden" : "Anmelden"}
        </Link>
        {session?.user && <AlleAngebote />}
      </main>
    </HydrateClient>
  );
}
