import clsx from "clsx";

const Pagination = ({
  locale,
  totalCount = 0,
  currentPage = 1,
  itemsPerPage = 5,
  onSelectPage,
}: Readonly<{
  locale: "en" | "ja";
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  onSelectPage: (page: number) => void;
  onSelectPerPage: (count: number) => void;
}>) => {
  const getTotalPages = () => {
    return Math.ceil(totalCount / itemsPerPage);
  };

  const displayedPages = () => {
    const totalPages = getTotalPages();
    const pages = [];
    const totalPagesToShow = 3;
    const maxVisiblePages = Math.min(totalPagesToShow, totalPages);

    if (currentPage <= 3) {
      for (let i = 1; i <= maxVisiblePages; i++) {
        pages.push(i);
      }
      if (totalPages > 5) {
        pages.push(null, totalPages);
      }
    } else if (currentPage > totalPages - 3) {
      if (totalPages > 5) {
        pages.push(1, null);
      }
      for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push(null); // Placeholder for ellipsis
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push(null); // Placeholder for ellipsis
      pages.push(totalPages);
    }

    return pages;
  };

  const getTotalLabel = () => {
    if (locale === "ja") return `全 ${totalCount}件`;
    return `Total: ${totalCount}`;
  };

  return (
    <div className="py-3 flex flex-wrap items-center justify-between text-sm">
      <div>
        <h3 className="text-sm">{getTotalLabel()}</h3>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex text-black">
          <button
            disabled={currentPage <= 1}
            className="disabled:text-gray-500 disabled:bg-transparent duration-300 rounded-md text-green-default mx-2 hover:bg-gray-200 px-2"
            onClick={() => onSelectPage(currentPage - 1)}
          >
            {locale === "ja" ? "前へ" : "Prev"}
          </button>
          {displayedPages().map((_, i) => (
            <button
              key={i}
              className={clsx(
                "duration-300 w-[40px] h-[40px] mx-2 rounded-md hover:bg-green-700 text-black",
                {
                  "bg-green-default text-white": _ === currentPage,
                }
              )}
              onClick={() => _ && onSelectPage(_)}
            >
              <span>{`${_ === null ? "..." : _}`}</span>
            </button>
          ))}
          <button
            disabled={currentPage >= getTotalPages()}
            className="disabled:text-gray-500 disabled:bg-transparent duration-300 rounded-md text-green-default mx-2 hover:bg-gray-200 px-2"
            onClick={() => onSelectPage(currentPage + 1)}
          >
            {locale === "ja" ? "次へ" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
