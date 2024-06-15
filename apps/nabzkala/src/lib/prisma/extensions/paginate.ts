import { Prisma } from "@prisma/client";
import prisma from "../index";

type PaginationOptions = {
  page?: number;
  pageSize?: number;
};

const paginate = Prisma.defineExtension({
  model: {
    $allModels: {
      async paginate<T, A>(
        this: T,
        args?: Prisma.Exact<A, Prisma.Args<T, "findMany">> & {
          pagination?: PaginationOptions;
        },
      ) {
        const { pagination, ...operationArgs } = (args ?? {}) as any;

        // Calculate the page.
        const page = args?.pagination?.page ? Number(args.pagination.page) : 1;

        // Calculate the pageSize.
        const pageSize = args?.pagination?.pageSize
          ? Number(args.pagination.pageSize)
          : 12;

        // Calculate the skip.
        const skip = page > 1 ? pageSize * (page - 1) : 0;

        // Run two operations in parallel and get results.
        const [data, total] = (await prisma.$transaction([
          (this as any).findMany({
            ...operationArgs,
            skip,
            take: pageSize,
          }),
          (this as any).count({ where: (operationArgs as any)?.where }),
        ])) as [Prisma.Result<T, A, "findMany">, number];

        return [
          data,
          {
            page,
            pageSize,
            pageCount: Math.ceil(total / pageSize),
            total,
          },
        ];
      },
    },
  },
});

export default paginate;
