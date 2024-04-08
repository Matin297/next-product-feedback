import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MUILink from "@mui/material/Link";
import Box from "@mui/material/Box";
import AcUnitTwoToneIcon from "@mui/icons-material/AcUnitTwoTone";

export default function Navbar() {
  return (
    <AppBar>
      <Toolbar>
        <Container>
          <Box display="flex" justifyContent="space-between">
            <MUILink
              underline="none"
              sx={{ color: "common.white" }}
              component={Link}
              href="/"
            >
              <Box display="flex" gap={2} alignItems="center">
                <AcUnitTwoToneIcon fontSize="large" />
                <Typography fontWeight="bold" variant="h5">
                  Feedback
                </Typography>
              </Box>
            </MUILink>
            <Button variant="outlined" color="secondary">
              Login
            </Button>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
