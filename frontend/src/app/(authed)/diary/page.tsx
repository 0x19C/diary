"use client";

import React, { useEffect, useState } from "react";
import { useDiaryStore } from "@/store/diary";
import { DashboardPagination } from "@/components/pagination";

const Page = () => {
  const { diaries, listDiary } = useDiaryStore();
  const {
    total,
    current_page
  } = useDiaryStore(s => s)
  const DefaultPaginationParams = {
    total: 0,
    page: 1,
    per_page: 10
  }
  const [paginationParams, setPaginationParams] = useState(DefaultPaginationParams);

  useEffect(() => {
    listDiary();
  }, [listDiary]);
  return (
    <>
      <section className="relative p-16 mt-2">
        <DashboardPagination
          locale="ja"
          totalCount={total}
          currentPage={current_page}
          itemsPerPage={1}
          onSelectPage={(page) => setPaginationParams({...paginationParams, page})}
          onSelectPerPage={(per_page) => setPaginationParams({...paginationParams, per_page})}
        />
        
        
      </section>
    </>
  );
};

export default Page;
