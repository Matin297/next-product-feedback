export interface FeedbackSortOption {
  order?: "asc" | "desc";
  field?: "comments" | "upvotes";
}

export interface FeedbackFilterOption {
  categoryId?: string;
  query?: string;
}

export interface FeedbackPaginationOptions {
  page?: number;
}
