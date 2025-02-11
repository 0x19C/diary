"use client";

import React, { useEffect } from "react";
import { useDiaryStore } from "@/store/diary";
import { DashboardPagination } from "@/components/pagination";
import ManagerDashboardTable from "@/components/table/dashboardTable";
import { useRouter } from "next/navigation";
import { Diary } from "@/api/common";
import { LoadingOverlay } from "@/components/overlay";

const Page = () => {
  const {
    isLoading,
    total,
    current_page,
    per_page,
    diaries,
    listDiary,
    removeDiary,
  } = useDiaryStore();

  const Header = [
    { field: "userid", label: "ID", sortable: true },
    { field: "is_open", label: "公 開", sortable: true },
    { field: "farm_name", label: "農 場 名", sortable: true, fill: true },
    { field: "agr_officeid", label: "担 当 者 名", sortable: true },
  ];
  const router = useRouter();

  useEffect(() => {
    listDiary(current_page, per_page).catch(() => router.push("login"));
  }, [current_page, per_page, listDiary]);

  const handleDelete = async (diary: Diary) => {
    try {
      await removeDiary(diary.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (diary: Diary) => {
    router.push(`/diary/edit/${diary.id}`);
  };

  const handleShow = (diary: Diary) => {
    router.push(`/diary/show/${diary.id}`);
  };

  return (
    <section className="relative container mx-auto mt-16">
      <div className="flex justify-end gap-8">
        <DashboardPagination
          locale="ja"
          totalCount={total}
          currentPage={current_page}
          itemsPerPage={per_page}
          onSelectPage={(page) => listDiary(page, per_page)}
          onSelectPerPage={(per) => listDiary(1, per)}
        />
        <button
          className="bg-green-default text-white px-4 py-3 rounded my-2 hover:bg-green-700 transition "
          onClick={() => router.push("/diary/new")}
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
        onShow={handleShow}
      />
      <LoadingOverlay isOpen={isLoading} />
    </section>
  );
};

export default Page;
