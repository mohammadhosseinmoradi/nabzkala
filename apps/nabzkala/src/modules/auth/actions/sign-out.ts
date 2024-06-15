"use server";

import { cookies } from "next/headers";

export default async function signOut() {
  const cookieStore = cookies();
  cookieStore.set({
    name: "token",
    value: "",
    expires: new Date("2016-10-05"),
    path: "/",
  });
}
