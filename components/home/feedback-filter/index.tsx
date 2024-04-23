import { fetchCategories } from "@/lib/data";
import FeedbackFilter from "./filter";

export default async function FeedbackFilterWrapper() {
  const categories = await fetchCategories();

  return <FeedbackFilter categories={categories} />;
}
