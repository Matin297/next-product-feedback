"use client";

import { useOptimistic, useState } from "react";
import { updateVotes } from "@/actions";

import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface VotingFormProps {
  id: string;
  upvotes: number;
}

interface Vote {
  votes: number;
  isPending?: boolean;
}

export default function VotingForm({ id, upvotes }: VotingFormProps) {
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const [optimisticState, updateOptimistic] = useOptimistic<Vote, number>(
    { votes: upvotes },
    (state, step) => ({
      ...state,
      isPending: true,
      votes: state.votes + step,
    })
  );

  const handleVoteUpdate = (step: 1 | -1) => async () => {
    updateOptimistic(step);
    const result = await updateVotes(id, upvotes + step);
    if (result?.error) {
      setSnackbar({
        open: true,
        message: result.error,
      });
    }
  };

  function handleSnackbarClose() {
    setSnackbar({
      open: false,
      message: "",
    });
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      alignSelf="flex-start"
      flexDirection="column"
    >
      <IconButton
        disabled={optimisticState.isPending}
        onClick={handleVoteUpdate(1)}
      >
        <KeyboardArrowUpIcon />
      </IconButton>

      <Typography fontWeight="bold">{optimisticState.votes}</Typography>

      <IconButton
        disabled={optimisticState.isPending}
        onClick={handleVoteUpdate(-1)}
      >
        <KeyboardArrowDownIcon />
      </IconButton>

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
    </Box>
  );
}
