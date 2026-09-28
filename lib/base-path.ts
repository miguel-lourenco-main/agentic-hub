// Prefix assets and routes when the app is hosted under a subpath
// (e.g. GitLab Pages). NEXT_PUBLIC_BASE_PATH is baked in at build time.

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prepend the deployment base path to a root-relative URL. */
export function withBasePath(path: string): string {
  if (!BASE_PATH) return path;
  if (!path.startsWith("/")) return `${BASE_PATH}/${path}`;
  return `${BASE_PATH}${path}`;
}

/** Strip the base path so client route checks see App Router paths. */
export function stripBasePath(pathname: string): string {
  if (!BASE_PATH) return pathname;
  return pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length) || "/"
    : pathname;
}


