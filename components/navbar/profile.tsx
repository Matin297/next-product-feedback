"use client";

import { useState, MouseEvent } from "react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

export default function Profile() {
  const { data, status } = useSession();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (status === "unauthenticated")
    return (
      <Box component="form" action={actions.signIn}>
        <Button type="submit" size="large">
          Login
        </Button>
      </Box>
    );

  if (status === "authenticated")
    return (
      <div>
        <IconButton
          sx={{ p: 1 }}
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
        >
          <Avatar
            alt={data.user?.name || "unknown"}
            src={data.user?.image || ""}
          />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Typography variant="caption" padding={2}>
            Signed in as {data.user?.email}
          </Typography>
          <MenuItem onClick={handleClose}>
            <Box width="100%" component="form" action={actions.logout}>
              <Button
                variant="contained"
                color="error"
                type="submit"
                size="small"
                sx={{ width: "100%" }}
              >
                Logout
              </Button>
            </Box>
          </MenuItem>
        </Menu>
      </div>
    );

  return null;
}
