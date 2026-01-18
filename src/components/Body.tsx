import { useRef, useState } from "react";
import BlogDetails from "./blog/BlogDetails";
import BlogList from "./blog/BlogList";
import { useBlogById, useBlogs } from "../hooks/useBlogs";
import { Button } from "./ui/button";
import { svgPacket } from "../lib/svgPacket";
import CreateBlogSection from "./blog/CreateBlogSection";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Body = () => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isCreateNewBlog, setIsCreateNewBlog] = useState<boolean>(false);
  const createFormRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(createFormRef, () => setIsCreateNewBlog(false));

  const { data, isLoading, isError } = useBlogs();
  const { data: selectedBlog } = useBlogById(selectedCardId);

  return (
    <div className="min-h-screen w-full p-5! ">
      <div className="h-[calc(100vh-40px)]  w-full  rounded-2xl p-5  grid grid-cols-1 md:grid-cols-12 gap-4">
        <aside className="col-span-12 md:col-span-3  rounded-2xl border border-white/10 flex flex-col gap-5  p-4! min-h-0">
          <div className="flex justify-between items-center">
            <p className="text-xl font-sans font-semibold text-white mb-4">All blogs</p>
            <Button variant="ghost" onClick={() => setIsCreateNewBlog(!isCreateNewBlog)} size="sm" className="cursor-pointer">
              {svgPacket["createNew"]}
              <span className="text-white">Create</span>
            </Button>
          </div>
          <BlogList selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId} data={data} isLoading={isLoading} isError={isError} />
        </aside>

        <main className={`col-span-9 absolute top-0 left-0 h-full w-full z-50 bg-black  min-h-0 md:relative  rounded-2xl border border-white/10 p-4! ${selectedBlog ? `block`:`hidden md:block`}`}>
          <BlogDetails blog={selectedBlog ?? null} />

          {selectedBlog && (<Button type="button" onClick={() => setSelectedCardId(null)} variant="ghost" className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm cursor-pointer px-4! shadow-[inset_2px_3px_3px_0px_rgba(183,183,183,0.24),inset_-1px_-2px_3px_0px_rgba(255,255,255,0.24)] border border-white/10 rounded-2xl!">
            <span className="rotate-45">{svgPacket["createNew"]}</span>
            <span>Close</span>
          </Button>)}
        </main>

        {isCreateNewBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div ref={createFormRef} className="bg-black relative w-full max-w-2xl max-h-[90vh] rounded-2xl border border-white/10 shadow-xl overflow-y-auto">
              <Button type="button" onClick={() => setIsCreateNewBlog(false)} variant="ghost" className="absolute top-1 right-3 rotate-45 cursor-pointer">
                {svgPacket["createNew"]}
              </Button>
              <CreateBlogSection setIsCreateNewBlog={setIsCreateNewBlog} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
