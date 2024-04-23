import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import CardContent from "@mui/material/CardContent";

const DATA = [1, 2];

export default function FeedbackListSkeleton() {
  return (
    <Stack spacing={1} flexGrow={1}>
      <Skeleton height={50} width="100px" />
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
