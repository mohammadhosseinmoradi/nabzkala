import { PrismaClient } from "@prisma/client";
import { paginate } from "@/lib/prisma/extensions";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(paginate);
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
