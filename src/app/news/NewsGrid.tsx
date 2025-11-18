import { NewsItem } from "@/components/ui/NewsItem";
import type { NewsItem as NewsItemType } from "@/app/types";

interface NewsGridProps {
  news: NewsItemType[];
}

export default function NewsGrid({ news }: NewsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {news.map((newsItem) => (
        <NewsItem key={newsItem.id} newsItem={newsItem} />
      ))}
    </div>
  );
}
