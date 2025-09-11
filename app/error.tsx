"use client";

import { useEffect } from "react";
import Link from "next/link";
import { withBasePath } from "@/lib/base-path";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    // You could log the error to an error reporting service here
    // console.error(error);
  }, [error]);

  return (
    <main className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="text-muted-foreground mb-6">Please try again or return to the homepage.</p>
      <Link href={withBasePath("/")} className="underline">
        Go back home
      </Link>
    </main>
  );
}


