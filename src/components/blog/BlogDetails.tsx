import type { Blog } from "../../types/blog";
import { timeAgo } from "../../lib/constant";
import { svgPacket } from "../../lib/svgPacket";

interface BlogDetailsProps {
  blog: Blog | null;
}

const BlogDetails = ({ blog }: BlogDetailsProps) => {
  if (!blog) {
    return <div className="text-gray-500 text-sm  italic font-mono h-full w-full flex justify-center items-center">Select a blog to see the details</div>;
  }
  return (
    <div className="text-white h-full w-full overflow-y-auto grid grid-rows-[auto_1fr] min-h-0  gap-10">
      <div className="h-96  w-full rounded-2xl overflow-hidden">
        <img src={blog?.coverImage} alt="blog cover" className="h-full w-full object-cover object-center" />
      </div>

      <div className=" w-full h-full  flex flex-col justify-start items-start gap-7">
        <p className="text-4xl font-sans font-semibold text-white">{blog?.title}</p>

        {/* --- Category + Date ---- */}
        <div className="flex justify-between w-full items-start md:items-center">
          <div className="flex flex-wrap justify-start items-center gap-5">
            {Array.isArray(blog?.category) && blog?.category?.length > 0 ? (
              blog?.category?.map((item, index) => {
                return (
                  <div key={index} className="flex justify-center h-full items-center gap-1">
                    {svgPacket[item.toLowerCase() as keyof typeof svgPacket]}
                    <span className="text-sm font-mono text-gray-500">{item}</span>
                    {/* {index !== blog?.category?.length - 1 && <div className="bg-gray-500 w-0.5 h-full"></div>} */}
                  </div>
                );
              })
            ) : (
              <span className="text-sm font-mono text-gray-500">{blog?.category}</span>
            )}
          </div>
          <div className="flex justify-center items-center gap-2">
            {svgPacket["timer"]}
            <p className="text-xs font-mono text-gray-500 tracking-tighter">{timeAgo(blog?.date)}</p>
          </div>
        </div>

        <div className="flex justify-start gap-5 w-full items-center">
          <div className="bg-gray-300 h-full w-0.5"></div>
          <p className="text-lg text-gray-300">{blog?.description}</p>
        </div>
        <div className="flex justify-between w-full items-center">
          <p className="text-base text-gray-300">{blog?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
