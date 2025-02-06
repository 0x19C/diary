"use client";

import {
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useState } from "react";
import clsx from "clsx";
import { Diary } from "@/api/common";
import { useDiaryStore } from "@/store/diary";

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
  editable = true,
  disableClone = false,
  disableDelete = false,
  onEdit,
  onDuplicate,
  onDelete,
  index
}: Readonly<{
  data: Diary;
  disableClone?: boolean;
  disableDelete?: boolean;
  editable?: boolean;
  onEdit: (data: any) => void;
  onDuplicate: (data: any) => void;
  onDelete: (data: any) => void;
  index: number;
}>) => {
  // const { fields } = data;
  console.log(data,'DATA')
  const { current_page, per_page } = useDiaryStore();
  
  const backendUrl = process.env.NEXT_PUBLIC_INTER_BACKEND_API_URL;
  const fileUrl = `${backendUrl}/storage/${data.file_path}`;
  const handleEditClicked = () => {
    onEdit(data);
  };

  const handleDuplicateClicked = () => {
    onDuplicate(data);
  };

  const handleDeleteClicked = () => {
    onDelete(data);
  };

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
            "p-4 text-sm whitespace-nowrap w-64",
          )}
        >
          <span>{data.summary}</span>
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
            <img 
              src={fileUrl} 
              alt="Image" 
              className="w-32 h-32 object-cover rounded" 
            />
          ) : (
            <span>No Image Available</span>
          )}
        </td>
      
    </tr>
  );
};



const ManagerDashboardTable = ({
  header,
  data,
  disableClone = false,
  disableDelete = false,
  pagination,
  editable = true,
  onEdit,
  onDuplicate,
  onDelete,
  onSelectPage,
  onSelectPerPage,
  sort_field,
  sort_order,
  onSortChanged,
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

  onEdit?: (data: any) => void;
  onDuplicate?: (data: any) => void;
  onDelete?: (data: any) => void;
  onSelectPage?: (page: number) => void;
  onSelectPerPage?: (count: number) => void;
  onSortChanged?: (sort_field: string, sort_order: string) => void;
}>) => {
  const handleEdit = (data: any) => {
    onEdit && onEdit(data);
  };

  const handleDuplicate = (data: any) => {
    onDuplicate && onDuplicate(data);
  };

  const handleDelete = (data: any) => {
    onDelete && onDelete(data);
  };

  return (
    <div>
      <div className="text-black-default rounded-lg border border-gray-default max-w-full overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead>
            <tr>
              <th className="p-4 text-left w-[10%]">ID</th>
              <th className="p-4 text-left w-auto">Summary</th>
              <th className="p-4 text-left w-[20%]">Entry Date</th>
              <th className="p-4 text-left w-[20%]">Image</th>
            </tr>
          </thead>
          <tbody>
            {data.map((_r, i) => (
              <DashboardTableEntry
                key={i}
                data={_r}
                index={i}
                disableClone={disableClone}
                disableDelete={disableDelete}
                editable={editable}
                onEdit={handleEdit}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default ManagerDashboardTable;