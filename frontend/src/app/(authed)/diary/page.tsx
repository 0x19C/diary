"use client";

import React, { useEffect } from "react";
import { useDiaryStore } from "@/store/diary";
import { DashboardPagination } from "@/components/pagination";

const Page = () => {
  const { last_page, current_page, per_page, diaries, listDiary } = useDiaryStore();

  useEffect(() => {
    listDiary(current_page, per_page);
  }, [current_page, per_page, listDiary]);

  if (!diaries) return <div>loading...</div>;
  return (
    <>
      <section className="relative p-16 mt-2">
        <DashboardPagination
          locale="ja"
          totalCount={last_page}
          currentPage={current_page}
          itemsPerPage={1}
          onSelectPage={(page) =>
            listDiary(page, per_page)
          }
          onSelectPerPage={(per) =>
            listDiary(1, per)
          }
        />
      </section>
    </>
  );

  return <div>{diaries.map(({ summary }) => summary)}</div>;
};

export default Page;
