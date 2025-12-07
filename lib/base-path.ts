const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string): string {
  if (!BASE_PATH) return path;
  if (!path.startsWith("/")) return `${BASE_PATH}/${path}`;
  return `${BASE_PATH}${path}`;
}

export function stripBasePath(pathname: string): string {
  if (!BASE_PATH) return pathname;
  return pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length) || "/"
    : pathname;
}


