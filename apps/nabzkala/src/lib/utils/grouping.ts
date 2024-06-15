export type Grouping<T, M> = {
  /** The name of the group. */
  name: string;
  /** The data in the group. */
  data: T;
  meta?: M;
};

/**
 * Grouping options.
 * @template T - The type of data to be grouped.
 */
export type GroupingOptions<T, M> = {
  /** The array of data to be grouped. */
  data: T[];
  /**
   * A function to retrieve the group name for each data item.
   * @param data
   */
  getGroupName: (item: T) => string;
  getGroupMeta?: (item: T) => M;
};

/**
 * Groups the given data based on the provided options.
 * @template T - The type of data to be grouped.
 * @param {GroupingOptions<T>} props - The grouping options.
 * @returns {Grouping<T[]>[]} An array of grouped data.
 */
export function grouping<T, M>(
  props: GroupingOptions<T, M>,
): Grouping<T[], M>[] {
  const { data, getGroupName, getGroupMeta } = props;

  // key is grouping name
  const normalizeData = new Map<string, T[]>();

  // key is grouping name
  const normalizeMeta = new Map<string, M>();

  data.forEach((dataItem) => {
    let groupName = getGroupName(dataItem);
    const prevData = normalizeData.get(groupName) || [];
    normalizeData.set(groupName, [...prevData, dataItem]);
    const meta = getGroupMeta && getGroupMeta(dataItem);
    meta && normalizeMeta.set(groupName, meta);
  });

  return [...normalizeData.entries()].map<Grouping<T[], M>>(
    ([name, values]) => {
      return {
        name,
        data: values,
        meta: normalizeMeta.get(name),
      };
    },
  );
}
