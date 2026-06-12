"use client";

import { useEffect } from "react";
import Link from "next/link";
import { withBasePath } from "@/lib/base-path";

// Client error boundary for recoverable runtime failures in the App Router tree.
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    // You could log the error to an error reporting service here
    // console.error(error);
  }, [error]);

  return (
    <main className="container mx-auto py-16 px-4 text-center">
      <h1 className="font-heading text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="text-muted-foreground mb-6">Please try again or return to the homepage.</p>
      <Link href={withBasePath("/")} className="underline transition-colors hover:text-gold">
        Go back home
      </Link>
    </main>
  );
}


