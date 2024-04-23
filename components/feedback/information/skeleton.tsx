import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import CardContent from "@mui/material/CardContent";

export default function FeedbackInfoSkeleton() {
  return (
    <Card elevation={3}>
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
  );
}
