/**
 * Represents the result of an operation, indicating success or failure.
 *
 * @template T - Type of the data on success.
 * @template E - Type of the error on failure.
 */
export type Result<T> =
  | {
      success: true;

      data: T;
      error?: never;
      message: string;
      meta?: Meta;
    }
  | {
      success: false;

      data?: never;
      error: any;
      message: string;
      meta?: Meta;
    };

/**
 * Metadata type, including pagination details.
 */
export type Meta = {
  pagination?: Pagination;
};

/**
 * Pagination information, specifying current page, page size, page count, and total items.
 */
export type Pagination = {
  /**
   * Current page
   */
  page: number;
  /**
   * Indicate number of items in page.
   */
  pageSize: number;
  /**
   * Indicate number of page.
   */
  pageCount: number;
  /**
   * Total items.
   */
  total: number;
};
