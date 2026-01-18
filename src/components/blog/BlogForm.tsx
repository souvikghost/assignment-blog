import React, { useState } from "react";
import { CATEGORIES, isValidImageUrl, type CategoryKey } from "../../lib/constant";
import { useCreateBlog } from "../../hooks/useBlogs";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { svgPacket } from "../../lib/svgPacket";
import type { FormErrors } from "../../types/blog";

interface BlogFormProps {
  setIsCreateNewBlog: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlogForm = ({setIsCreateNewBlog}:BlogFormProps) => {
  const { mutate, isPending } = useCreateBlog();
  const [errors, setErrors] = useState<FormErrors>({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState<CategoryKey[]>([]);

  const toggleCategory = (cat: CategoryKey) => {
    // setCategory((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
    setCategory((prev) => {
      const next = prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat];

      if (next.length > 0) clearError("category");
      return next;
    });
  };
  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim() || title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!coverImage.trim()) {
      newErrors.coverImage = "Cover image URL is required";
    } else if (!isValidImageUrl(coverImage)) {
      newErrors.coverImage = "Enter a valid image URL (.jpg, .jpeg, .png, .svg)";
    }

    if (!description.trim() || description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!content.trim() || content.length < 20) {
      newErrors.content = "Content must be at least 20 characters";
    }

    if (category.length === 0) {
      newErrors.category = "Select at least one category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    mutate({
      title,
      description,
      content,
      coverImage,
      category,
      date: new Date().toISOString(),
    });

    // reset form
    setTitle("");
    setDescription("");
    setContent("");
    setCoverImage("");
    setCategory([]);
    setIsCreateNewBlog(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-5 items-start w-full text-white">


      {/* Title */}
      <div className="space-y-2 w-full flex flex-col gap-1">
        <label className="text-base font-medium text-gray-300">Title</label>
        <Input
          placeholder="Provide a title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            clearError("title");
          }}
          className={`
    px-2! focus:border-white/10! text-sm font-medium text-white placeholder:text-gray-700
    border ${errors.title ? "border-red-800" : "border-white/10"}
  `}
        />
        {errors.title && <p className="text-xs text-red-800 mt-1">{errors.title}</p>}
      </div>

      {/* Cover Image */}
      <div className="space-y-2 w-full flex flex-col gap-1">
        <label className="text-base font-medium text-gray-300">Cover Image URL</label>
        <Input
          placeholder="Provide a valid URL"
          value={coverImage}
          onChange={(e) => {
            setCoverImage(e.target.value);
            clearError("coverImage");
          }}
          className={`
    px-2! text-sm focus:border-white/10! font-medium text-white placeholder:text-gray-700
    border ${errors.coverImage ? "border-red-800" : "border-white/10"}
  `}
        />
        {errors.coverImage && <p className="text-xs text-red-800 mt-1">{errors.coverImage}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2 w-full flex flex-col gap-1">
        <label className="text-base font-medium text-gray-300">Short Description</label>
        <Textarea
          placeholder="Brief summary of the blog"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            clearError("description");
          }}
          className={`p-2! text-sm focus:border-white/10! max-h-32 font-medium text-white placeholder:text-gray-700 resize-none
    border ${errors.description ? "border-red-800" : "border-white/10"}`}
        />
        {errors.description && <p className="text-xs text-red-800 mt-1">{errors.description}</p>}
      </div>

      {/* Content */}
      <div className="space-y-2 w-full flex flex-col gap-1">
        <label className="text-base font-medium text-gray-300">Content</label>
        <Textarea
          placeholder="Throw some content here"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            clearError("content");
          }}
          className={`
    p-2! text-sm font-medium focus:border-white/10! text-white max-h-32 placeholder:text-gray-700 resize-none
    border ${errors.content ? "border-red-800" : "border-white/10"}
  `}
        />
        {errors.content && <p className="text-xs text-red-800 mt-1">{errors.content}</p>}
      </div>

      {/* Categories */}
      <div className="space-y-3 w-full flex flex-col gap-3">
        <p className="text-base font-medium text-gray-300">Categories</p>

        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = category.includes(cat);

            return (
              <label
                key={cat}
                className={`
          flex items-center w-fit gap-2 text-sm font-medium cursor-pointer
          ${isSelected ? "text-white" : "text-gray-500"}
        `}
              >
                <Checkbox checked={isSelected} onCheckedChange={() => toggleCategory(cat)} className="border-white/20" />

                {svgPacket[cat.toLowerCase() as keyof typeof svgPacket]}

                {cat}
              </label>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <div className=" flex justify-center mt-5! w-full">
        <Button type="submit" variant="outline" disabled={isPending} className="w-2/4 text-base font-medium text-black cursor-pointer">
          {isPending ? "Creating..." : "Create Blog"}
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;
