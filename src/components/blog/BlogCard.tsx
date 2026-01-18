import { timeAgo } from "../../lib/constant";
import { svgPacket } from "../../lib/svgPacket";
import type { Blog } from "../../types/blog";
import { Card, CardContent } from "../ui/card";

interface BlogCardProps {
  cardData: Blog;
  setSelectedCardId: (id: number) => void;
  selectedCardId: number | null;
}

const BlogCard = ({ cardData, setSelectedCardId, selectedCardId }: BlogCardProps) => {

  return (
    <Card onClick={() => setSelectedCardId(cardData?.id)} className={`relative w-full overflow-hidden shrink-0 p-3! border  cursor-pointer ${selectedCardId == cardData?.id ? `border-white/30 shadow-[0px_0px_20px_0px_rgba(106,114,130,0.3)]` : `border-white/10`}`}>
      <div className="absolute left-0 top-0 h-full w-1" />

      <CardContent className="flex flex-col justify-center gap-2 items-start">
        <div className="flex items-center justify-between w-full mb-2!">
          <div className="flex items-center h-full gap-3">
            {Array.isArray(cardData?.category) && cardData?.category?.length > 0 ? (
              cardData?.category?.length > 2 ? (
                cardData?.category.slice(0, 2)?.map((item, index) => {
                  return (
                    <div className="flex justify-center h-full items-center gap-1">
                      {svgPacket[item.toLowerCase() as keyof typeof svgPacket]}
                      <span key={index} className="text-xs font-mono text-gray-500">
                        {item}
                      </span>
                    </div>
                  );
                })
              ) : (
                cardData?.category?.map((item, index) => {
                  return (
                    <div className="flex justify-center h-full items-center gap-1">
                      {svgPacket[item.toLowerCase() as keyof typeof svgPacket]}
                      <span key={index} className="text-xs font-mono text-gray-500">
                        {item}
                      </span>
                    </div>
                  );
                })
              )
            ) : (
              <span className="text-xs font-mono text-gray-500">{cardData?.category}</span>
            )}
           {cardData?.category?.length > 2 && ( <span className="text-xs font-mono text-gray-500">...more</span>)}
          </div>
          <span className="text-xs font-mono tracking-tighter text-gray-500">{timeAgo(cardData?.date)}</span>
        </div>

        {/* Title */}
        <div>
          <p className="text-xl font-sans font-semibold text-white">{cardData?.title?.length > 50 ? `${cardData?.title?.slice(0, 50)} ...` : cardData?.title}</p>
        </div>

        {/* Description */}
        <div className="">
          <p className="text-sm font-mono text-gray-500">{cardData?.content?.length > 70 ? `${cardData?.content?.slice(0, 70)} ...` : cardData?.content}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
