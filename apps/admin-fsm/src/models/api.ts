export interface PaginatedData<T> {
  data: T[];
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}
