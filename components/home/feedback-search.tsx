"use client";

import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function FeedbackSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", "1");

      if (e.target.value) {
        params.set("query", e.target.value);
      } else {
        params.delete("query");
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    500
  );

  return (
    <>
      <Typography fontWeight="bold">Search</Typography>
      <TextField
        onChange={handleChange}
        defaultValue={searchParams.get("query") || ""}
        label="Feedback..."
      />
    </>
  );
}
