import Link from "next/link";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { AlleAngebote } from "./_components/angebot";
import LoginPrompt from "./_components/LoginPrompt";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getAll.prefetch();
  }

  if (!session) {
    return <LoginPrompt />;
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
