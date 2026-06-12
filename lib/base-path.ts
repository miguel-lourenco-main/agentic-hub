// Prefix for subpath deployments (e.g. GitHub Pages). Empty in local dev.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Prepend the deploy base path so links and assets resolve correctly.
export function withBasePath(path: string): string {
  if (!BASE_PATH) return path;
  if (!path.startsWith("/")) return `${BASE_PATH}/${path}`;
  return `${BASE_PATH}${path}`;
}

// Normalize a full pathname back to an app-relative route for routing checks.
export function stripBasePath(pathname: string): string {
  if (!BASE_PATH) return pathname;
  return pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length) || "/"
    : pathname;
}


