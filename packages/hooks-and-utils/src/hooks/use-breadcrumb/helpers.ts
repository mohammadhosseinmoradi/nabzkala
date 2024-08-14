export function getPathSegments(pathname: string) {
  if (!pathname) return [];
  if (pathname === "/") return [];
  return (pathname.startsWith("/") ? pathname.slice(1) : pathname).split("/");
}
