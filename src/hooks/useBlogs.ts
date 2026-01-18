import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBlog, fetchBlogById, fetchBlogs } from "../lib/constant";

// GET all blogs
export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
};

// GET blog by ID
export const useBlogById = (id: number | null) => {
  return useQuery({
    queryKey: ["blogs", id],
    queryFn: () => fetchBlogById(id as number),
    enabled: !!id,
  });
};

// POST blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};