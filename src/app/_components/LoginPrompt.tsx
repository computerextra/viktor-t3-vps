"use client";

import Link from "next/link";

export default function LoginPrompt() {
  return (
    <div className="container mx-auto mt-15">
      <p className="text-4xl text-center">
        Um diese Seite nutzen zu können ist eine{" "}
        <Link className="underline" href="/api/auth/signin">
          Anmeldung
        </Link>{" "}
        erforderlich
      </p>
    </div>
  );
}
