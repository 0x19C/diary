"use client";

import {
  faEdit,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useState } from "react";
import clsx from "clsx";
import { Diary } from "@/api/common";
import { useDiaryStore } from "@/store/diary";
import Image from "next/image";
import DeleteConfirmModal from "../modal/confirmButton";

export type IDataEntry = {
  fields: { width?: string; fill?: boolean; value: ReactNode | string }[];
  background?: string;
  id: number;
};

export const EditOption: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  return (
    <Popup
      trigger={<div className="p-2"></div>}
      position="bottom right"
      contentStyle={{ width: 160 }}
      open={dropdownOpened}
      onOpen={() => setDropdownOpened(true)}
    >
      {children}
    </Popup>
  )
}

const DashboardTableEntry = ({
  data,
  onEdit,
  onDelete,
  onShow,
  index
}: Readonly<{
  data: Diary;
  disableClone?: boolean;
  disableDelete?: boolean;
  editable?: boolean;
  onEdit: (data: Diary) => void;
  onDelete: (data: Diary) => void;
  onShow: (data: Diary) => void;
  index: number;
}>) => {

  const { current_page, per_page } = useDiaryStore();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const fileUrl = `${backendUrl}/storage/${data.file_path}`;
  const handleEditClicked = () => {
    onEdit(data);
  }; 

  const handleDeleteClicked = async() => {
    onDelete(data);
  };

  const handleShowClicked = () => {
    onShow(data);
  }

  return (
    <tr className="border-t border-gray-default" style={{ background:  'transparent' }}>
      
        <td
          key={data.id}
          className={clsx(
            "p-4 text-sm whitespace-nowrap w-24",
          )}
        >
          <span>{(index+1) + ((current_page - 1 )* per_page)}</span>
        </td>
        <td
          key={data.summary}
          className={clsx(
            "p-4 text-sm whitespace-nowrap w-64 ",
          )}
        >
          <span>{data.summary.length > 10 ? `${data.summary.slice(0,10)}...` : data.summary}</span>
        </td>
        <td
          key={data.entry_date}
          className={clsx(
            "p-4 text-sm whitespace-nowrap w-24",
          )}
        >
          <span>{data.entry_date}</span>
        </td>
        <td
          key={data.file_path}
          className={clsx(
            "p-4 text-sm whitespace-nowrap w-24",
          )}
        >
          {data.file_path ? (
            <Image
              src={fileUrl} 
              alt="Image" 
              height={120}
              width={80}
              className="object-cover rounded" 
            />
          ) : (
            <span></span>
          )}
        </td>
        <td
          className={clsx(
            "p-4 text-sm whitespace-nowrap w-24",
          )}
        >
          <div className="flex gap-2">
            <button
              onClick={handleShowClicked}
              className="text-green-600 hover:text-green-800"
              aria-label="詳細"
              title="詳細"
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
            <button
              onClick={handleEditClicked}
              className="text-green-600 hover:text-green-800"
              aria-label="編集"
              title="編集"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              onClick={handleDeleteClicked}
              className="text-red-600 hover:text-red-800"
              aria-label="削除"
              title="削除"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>

        </td>      
    </tr>
  );
};

const ManagerDashboardTable = ({
  data,
  disableClone = false,
  disableDelete = false,
  editable = true,
  onEdit,
  onDelete,
  onShow,
}: Readonly<{
  editable?: boolean;
  disableClone?: boolean;
  disableDelete?: boolean;
  header: {
    field?: string;
    label: string;
    fill?: boolean;
    sortable?: boolean;
  }[];
  data: Diary[];
  pagination?: {
    total: number;
    current_page: number;
    per_page: number;
  };
  sort_field?: string;
  sort_order?: string;

  onEdit?: (data: Diary) => void;
  onDelete?: (data: Diary) => void;
  onSelectPage?: (page: number) => void;
  onSelectPerPage?: (count: number) => void;
  onSortChanged?: (sort_field: string, sort_order: string) => void;
  onShow: (data: Diary) => void;
}>) => {
  const [confirm, setConfirm] = useState<Diary>();
  
  const handleEdit = (data: Diary) => {
     onEdit?.(data);
  };

  const handleShow = (data: Diary) => {
    onShow(data);
  }

  const handleDelete = (data: Diary) => {
     onDelete?.(data);

  };

  return (
    <div>
      <div className="text-black-default rounded-lg border border-gray-default max-w-full overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left w-[10%]">番号</th>
              <th className="p-4 text-left w-auto">内容</th>
              <th className="p-4 text-left w-[20%]">作成日</th>
              <th className="p-4 text-left w-[20%]">添付画像</th>
            </tr>
          </thead>
          <tbody>
            {(data && data.length > 0) ? data.map((_r, i) => (
              <DashboardTableEntry
                key={i}
                data={_r}
                index={i}
                disableClone={disableClone}
                disableDelete={disableDelete}
                editable={editable}
                onEdit={handleEdit}
                onDelete={() => setConfirm(_r)}
                onShow={handleShow}
              />
            )): <tr><td colSpan={4} className="text-center text-xl p-3">表示する日記データが存在しません。</td></tr>}
          </tbody>
        </table>
      </div>
      {confirm && <DeleteConfirmModal
        title="削除"
        description="削除しますか？"
        onClose={() => setConfirm(undefined)}
        onConfirm={() => handleDelete(confirm)} />
      }
    </div>
  );
};

export default ManagerDashboardTable;