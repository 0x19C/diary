"use client";

import React, { useEffect } from "react";
import { useDiaryStore } from "@/store/diary";
import { DashboardPagination } from "@/components/pagination";
import ManagerDashboardTable from "@/components/table/dashboardTable";
import { useRouter } from "next/navigation";
import { Diary } from "@/api/common";
import { diaryDeleting } from "@/api/diary";


const Page = () => {
  const { last_page, current_page, per_page, diaries, listDiary, removeDiary } = useDiaryStore();
  const Header = [
    { field: "userid", label: "ID", sortable: true },
    { field: "is_open", label: "公 開", sortable: true },
    { field: "farm_name", label: "農 場 名", sortable: true, fill: true },
    { field: "agr_officeid", label: "担 当 者 名", sortable: true },
  ]
    const router = useRouter();
  
  useEffect(() => {
    listDiary(current_page, per_page);
  }, [current_page, per_page, listDiary]);

  const handleDelete  = async (diary: Diary) => {
    try {
      await removeDiary(diary.id);
    } catch(error) {
      console.error(error);
    }
    console.log('delete page', diary)
  }

  const handleEdit = (diary: Diary) => {
    console.log(diary,'EEE')
  }

  if (!diaries) return <div>loading...</div>;
  return (
    <>
      <section className="relative p-16 mt-2">
        <div className="flex justify-end gap-8">
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
           <button
            className="bg-green-default text-white px-4 py-3 rounded my-2 hover:bg-green-700 transition "
            onClick={() => router.push('/diary/new')}
          >
            新規作成
          </button>
        </div>
        
        <ManagerDashboardTable
          editable={false}
          header={Header}
          data={diaries}
          sort_field=""
          sort_order=""
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

      </section>
    </>
  );

};

export default Page;
