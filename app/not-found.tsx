import Link from "next/link";
import { withBasePath } from "@/lib/base-path";

export default function NotFound() {
  return (
    <main className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Page not found</h1>
      <p className="text-muted-foreground mb-6">The page you are looking for does not exist.</p>
      <Link href={withBasePath("/")} className="underline">
        Go back home
      </Link>
    </main>
  );
}


