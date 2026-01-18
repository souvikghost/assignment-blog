import BlogCard from "./BlogCard";
import type { Blog } from "../../types/blog";

interface BlogListProps {
  data?: Blog[];
  isLoading: boolean;
  isError: boolean;
  setSelectedCardId: (id: number) => void;
  selectedCardId:number | null
}

const BlogList = ({ data, isLoading, isError, setSelectedCardId, selectedCardId }: BlogListProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div className="text-gray-500 text-sm  italic font-mono h-full w-full flex justify-center items-center">Something went wrong</div>;
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto w-full flex flex-col gap-3">
      {data && data.length > 0 ? (
        data
          .slice()
          .sort((a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((item: Blog) => <BlogCard selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId} key={item.id} cardData={item} />)
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
};

export default BlogList;
