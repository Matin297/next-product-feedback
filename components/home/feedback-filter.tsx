"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

interface FeedbackFilterProps {
  categories: Category[];
}

export default function FeedbackFilter({ categories }: FeedbackFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeId, setActiveId] = useState(searchParams.get("categoryId"));

  const handleClick = (id: string | null) => () => {
    const params = new URLSearchParams(searchParams);

    if (id) {
      params.set("categoryId", id);
    } else {
      params.delete("categoryId");
    }

    setActiveId(id);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Typography fontWeight="bold">Filter</Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        <Chip
          color="secondary"
          variant={!activeId ? "filled" : "outlined"}
          label="All"
          onClick={handleClick(null)}
        />
        {categories.map(({ title, id }) => (
          <Chip
            color="secondary"
            variant={activeId === id ? "filled" : "outlined"}
            key={id}
            label={title}
            onClick={handleClick(id)}
          />
        ))}
      </Box>
    </>
  );
}
