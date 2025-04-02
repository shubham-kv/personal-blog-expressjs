export interface IBlog {
  id: string;
  title: string;
  excerpt?: string | null | undefined;
  content: string;
  isDraft: boolean;
  publishDate?: Date | string;
  publishedAt: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type Pagination = {
  page: number;
  limit: number;
};

export type PaginatedData<T> = {
  data: T;
  page: number;
  limit: number;
  total: number;
};
