"use client";

import { ReactNode } from "react";

/**
 * Api provider for use 'api' inside client.
 * This provider add some information that need in client side data fetching.
 * @param children
 * @constructor
 */
export default function ApiProvider({ children }: { children?: ReactNode }) {
  return children;
}
