export type PaginatedResponse<T = any> = {
    results: T;
    next?: string;
    previous?: string;
    count: number;
  };
  