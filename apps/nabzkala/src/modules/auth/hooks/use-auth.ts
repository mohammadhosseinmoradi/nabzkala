import { useContext } from "react";
import AuthContext from "@/modules/auth/context";
import signOut from "@/modules/auth/actions/sign-out";
import { useSWRConfig } from "swr";
import { Role } from "@prisma/client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext.Provider not found!");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const { mutate } = useSWRConfig();

  const revalidate = async () => mutate("auth-user");

  const handleSignOut = async () => {
    document.cookie =
      "token=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    await signOut();
    void revalidate();
  };

  const getUserRoleTitle = () => {
    const role = context.user?.role;
    return role === Role.ADMIN
      ? "ادمین"
      : role === Role.Seller
        ? "فروشنده"
        : "کاربر عادی";
  };

  const goToSignIn = async () =>
    router.push(
      `/${params?.locale}/sign-in?back-url=${window.location.toString()}`,
    );

  const goToBackUrl = async () => {
    const backUrl = searchParams.get("back-url");
    if (!backUrl) return router.push("/");
    return router.push(backUrl!);
  };

  return {
    user: context.user,
    actions: {
      signOut: handleSignOut,
      getUserRoleTitle,
      goToSignIn,
      goToBackUrl,
      revalidate,
    },
  };
}
