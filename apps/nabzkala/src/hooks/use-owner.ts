import { useMemo } from "react";
import { getOwnerDocument } from "@/lib/utils/owner";

export function useOwnerDocument(...args: Parameters<typeof getOwnerDocument>) {
  return useMemo(() => getOwnerDocument(...args), [...args]);
}
