export interface FeedbackSortOption {
  order?: "asc" | "desc";
  field?: "comments" | "upvotes";
}

export interface FeedbackFilterOption {
  categoryId?: string;
}
