"use client";

import { useSearchParams, usePathname } from "next/navigation";

import Link from "@mui/material/Link";
import MuiPagination from "@mui/material/Pagination";
import MuiPaginationItem from "@mui/material/PaginationItem";

interface PaginationProps {
  count: number;
}

export default function Pagination({ count }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function createPageURL(page: number | null) {
    const params = new URLSearchParams(searchParams);

    if (page) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    return `${pathname}?${params.toString()}`;
  }

  return (
    <MuiPagination
      count={count}
      defaultPage={Number(searchParams.get("page")) || 1}
      renderItem={(item) => (
        <MuiPaginationItem
          {...item}
          component={Link}
          href={createPageURL(item.page)}
        />
      )}
    />
  );
}
