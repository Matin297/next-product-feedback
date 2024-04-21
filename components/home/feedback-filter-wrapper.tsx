import { fetchCategories } from "@/lib/data";
import FeedbackFilter from "./feedback-filter";

export default async function FeedbackFilterWrapper() {
  const categories = await fetchCategories();

  return <FeedbackFilter categories={categories} />;
}
