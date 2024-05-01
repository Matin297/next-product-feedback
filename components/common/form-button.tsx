import { useFormStatus } from "react-dom";
import { PropsWithChildren } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function FormButton({ children }: PropsWithChildren) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} variant="contained">
      {pending ? (
        <CircularProgress size={20} sx={{ color: "white" }} />
      ) : (
        children
      )}
    </Button>
  );
}
