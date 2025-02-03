"use client";

import React, { useEffect } from "react";
import { useDiaryStore } from "@/store/diary";

const Page = () => {
  const { current_page, diaries, listDiary } = useDiaryStore();

  useEffect(() => {
    listDiary(current_page);
  }, [current_page, listDiary]);
  return <div>{diaries.map(({ summary }) => summary)}</div>;
};

export default Page;
