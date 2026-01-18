export const BASE_URL = "http://localhost:3001/blogs";
export type CategoryKey = "finance" | "tech" | "career" | "education" | "lifestyle" | "regulations";
export const CATEGORIES = ["FINANCE", "TECH", "CAREER", "EDUCATION", "LIFESTYLE", "REGULATIONS"];
export const ALLOWED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "svg"];



// GET /blogs
export const fetchBlogs = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
};

// GET /blogs/:id
export const fetchBlogById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }
  return res.json();
};

// POST /blogs
export const createBlog = async (newBlog) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBlog),
  });

  if (!res.ok) {
    throw new Error("Failed to create blog");
  }

  return res.json();
};

export const timeAgo = (isoDate: string): string => {
  const now = new Date();
  const past = new Date(isoDate);

  if (isNaN(past.getTime())) return isoDate;

  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    return "Today";
  }

  if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  }

  return past.toLocaleDateString();
};


export const isValidImageUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const extension = parsedUrl.pathname.split(".").pop()?.toLowerCase();
    return !!extension && ALLOWED_IMAGE_EXTENSIONS.includes(extension);
  } catch {
    return false;
  }
};
