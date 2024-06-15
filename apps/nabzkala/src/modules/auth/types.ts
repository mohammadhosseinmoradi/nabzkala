import { User } from "@prisma/client";

export type AuthUser = Pick<
  User,
  "firstName" | "lastName" | "phone" | "email" | "role"
>;
