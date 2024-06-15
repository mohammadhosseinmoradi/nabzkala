import axios from "axios";

/**
 * Use it on both, server and client.
 */
export const api = axios.create({
  baseURL: `/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  let token = null;

  // If runs on the server read token from next cookies
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    token = cookieStore.get("token")?.value || null;
  }

  // Add the token to the headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
