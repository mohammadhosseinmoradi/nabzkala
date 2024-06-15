export default function isSwrInfiniteReachedEnd({
  data,
  pageSize,
}: {
  data?: any[][];
  pageSize: number;
}) {
  return !!data?.length && (data?.[data.length - 1]?.length || 0) < pageSize;
}
