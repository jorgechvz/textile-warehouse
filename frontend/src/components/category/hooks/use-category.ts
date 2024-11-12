import { fetchCategories } from "@/api/category.api";
import { useQuery } from "@tanstack/react-query";

export const useCategory = () => {
  const queryCategories = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return {
    queryCategories,
  };
};
