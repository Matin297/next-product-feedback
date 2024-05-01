import Profile from "./profile";
import Box from "@mui/material/Box";
import MUILink from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AcUnitTwoToneIcon from "@mui/icons-material/AcUnitTwoTone";

export default function Navbar() {
  return (
    <AppBar variant="outlined" sx={{ backgroundColor: "common.white" }}>
      <Toolbar>
        <Container maxWidth="xl">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <MUILink underline="none" href="/">
              <Box display="flex" gap={2} alignItems="center">
                <AcUnitTwoToneIcon fontSize="large" />
                <Typography fontWeight="bold" variant="h5">
                  Feedback
                </Typography>
              </Box>
            </MUILink>
            <Profile />
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
