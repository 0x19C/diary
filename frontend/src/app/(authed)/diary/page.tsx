"use client";

import React, { useEffect, useState } from "react";
import { useDiaryStore } from "@/store/diary";
import { DashboardPagination } from "@/components/pagination";

const Page = () => {
  const {
    total,
    current_page,
    diaries,
    listDiary
  } = useDiaryStore(s => s)
  const DefaultPaginationParams = {
    total: 0,
    page: 1,
    per_page: 10
  }
  const [paginationParams, setPaginationParams] = useState(DefaultPaginationParams);

  useEffect(() => {
    listDiary(current_page);
  }, [current_page, listDiary]);
  
  if (!diaries) return <div>loading...</div>;
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


  return <div>{diaries.map(({ summary }) => summary)}</div>;
};

export default Page;
