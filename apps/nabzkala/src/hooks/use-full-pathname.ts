import { usePathname, useSearchParams } from "next/navigation";

export function useFullPathname() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return pathname + (searchParams.toString() && `?${searchParams.toString()}`);
}
