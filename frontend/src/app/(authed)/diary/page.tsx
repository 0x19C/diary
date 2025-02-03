"use client";

import React, { useEffect } from "react";
import { useDiaryStore } from "@/store/diary";

const Page = () => {
  const { diaries, listDiary } = useDiaryStore();

  useEffect(() => {
    listDiary();
  }, [listDiary]);
  return <div>{diaries.map(({ summary }) => summary)}</div>;
};

export default Page;
