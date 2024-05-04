"use client";

import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormButton from "@/components/common/form-button";

type DeleteResult =
  | {
      error?: string;
    }
  | undefined;

interface DeleteDialogProps {
  deleteAction: () => Promise<DeleteResult>;
}

export default function DeleteDialog({ deleteAction }: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  async function handleFormAction() {
    const result = await deleteAction();

    if (result?.error) {
      setSnackbar({
        open: true,
        message: result.error,
      });
    }
  }

  function handleSnackbarClose() {
    setSnackbar({
      open: false,
      message: "",
    });
  }

  return (
    <>
      <IconButton color="error" onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            onClick={handleClose}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <form action={handleFormAction}>
            <FormButton>Delete</FormButton>
          </form>
        </DialogActions>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleSnackbarClose}
        action={
          <IconButton
            color="inherit"
            aria-label="close"
            onClick={handleSnackbarClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </>
  );
}
