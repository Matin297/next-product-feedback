import Pagination from "./index";

interface PaginationWrapperProps {
  fetchTotalPages: () => Promise<number>;
}

export default async function PaginationWrapper({
  fetchTotalPages,
}: PaginationWrapperProps) {
  const totalPages = await fetchTotalPages();

  if (totalPages > 1) return <Pagination count={totalPages} />;

  return null;
}
