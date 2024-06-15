import { createContext } from "react";
import { AuthUser } from "@/modules/auth/types";

export type AuthContextProps = {
  user: AuthUser | null;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export default AuthContext;
