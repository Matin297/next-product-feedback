import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";

const DATA = [1, 2];

export default function FeedbackListSkeleton() {
  return (
    <Stack flexGrow={1} spacing={2}>
      <Box display="flex" alignItems="center">
        <Typography variant="h6">Suggestions</Typography>
        <IconButton color="secondary" href="/feedback/create">
          <AddIcon />
        </IconButton>
      </Box>
      <Stack spacing={2}>
        {DATA.map((item) => (
          <Card elevation={3} key={item}>
            <CardContent>
              <Skeleton height={25} width="40%" style={{ marginBottom: 10 }} />
              <Skeleton height={20} style={{ marginBottom: 6 }} />
              <Skeleton height={20} style={{ marginBottom: 6 }} />
              <Skeleton height={20} style={{ marginBottom: 6 }} />
              <Skeleton height={20} style={{ marginBottom: 6 }} />
              <Skeleton height={20} style={{ marginBottom: 6 }} />
              <Skeleton height={20} width="80%" />
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
