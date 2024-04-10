import { fetchCategories } from "@/lib/data";
import CreateFeedbackForm from "@/components/feedback/create-feedback-form";

export default async function CreateFeedback() {
  const categories = await fetchCategories();

  return <CreateFeedbackForm categories={categories} />;
}
