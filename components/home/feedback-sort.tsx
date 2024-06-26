"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import FormControl from "@mui/material/FormControl/FormControl";

const FEEDBACK_SORT_OPTIONS = [
  {
    id: 1,
    title: "Most Upvotes",
    value: "upvotes/desc",
  },
  {
    id: 2,
    title: "Least Upvotes",
    value: "upvotes/asc",
  },
  {
    id: 3,
    title: "Most Comments",
    value: "comments/desc",
  },
  {
    id: 4,
    title: "Least Comments",
    value: "comments/asc",
  },
];

export default function FeedbackSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(e: SelectChangeEvent) {
    const params = new URLSearchParams(searchParams);

    const [field, order] = e.target.value.split("/");

    params.set("page", "1");
    params.set("field", field);
    params.set("order", order);

    router.replace(`${pathname}?${params.toString()}`);
  }

  function readDefaultOrder() {
    if (!searchParams.get("field") || !searchParams.get("order")) {
      return "";
    }
    return `${searchParams.get("field")}/${searchParams.get("order")}`;
  }

  return (
    <>
      <Typography fontWeight="bold">Sort</Typography>
      <FormControl>
        <InputLabel id="orderby">Order By</InputLabel>
        <Select
          id="orderby"
          label="Order By"
          labelId="orderby"
          defaultValue={readDefaultOrder()}
          onChange={handleChange}
        >
          {FEEDBACK_SORT_OPTIONS.map(({ id, title, value }) => (
            <MenuItem key={id} value={value}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
