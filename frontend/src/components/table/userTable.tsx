"use client";

import {
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useState } from "react";
import clsx from "clsx";
import { User } from "@/api/common";
import { userStore } from "@/store/user";

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
  onDelete,
  index
}: Readonly<{
  data: User;
  disableClone?: boolean;
  disableDelete?: boolean;
  editable?: boolean;
  onDelete: (data: User) => void;
  index: number;
}>) => {
  const { current_page, per_page } = userStore();
  

  

  const handleDeleteClicked = async() => {
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
          key={data.name}
          className={clsx(
            "p-4 text-sm whitespace-nowrap w-64",
          )}
        >
          <span>{data.name}</span>
        </td>
        <td
          key={data.email}
          className={clsx(
            "p-4 text-sm whitespace-nowrap w-64",
          )}
        >
          <span>{data.email}</span>
        </td>
        
        <td
          className={clsx(
            "p-4 text-sm whitespace-nowrap w-24",
          )}
        >
          <div className="flex gap-2">
            
            <button
              onClick={handleDeleteClicked}
              className="text-red-600 hover:text-red-800"
              aria-label="Delete"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
          
        </td>
      
    </tr>
  );
};

const UserTable = ({
  data,
  disableClone = false,
  disableDelete = false,
  editable = true,
  onDelete,
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
  data: User[];
  pagination?: {
    total: number;
    current_page: number;
    per_page: number;
  };
  sort_field?: string;
  sort_order?: string;

  onEdit?: (data: User) => void;
  onDelete?: (data: User) => void;
  onSelectPage?: (page: number) => void;
  onSelectPerPage?: (count: number) => void;
  onSortChanged?: (sort_field: string, sort_order: string) => void;
}>) => {
  



  const handleDelete = (data: User) => {
    onDelete?.(data);
  };

  return (
    <div>
      <div className="text-black-default rounded-lg border border-gray-default max-w-full overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead>
            <tr>
              <th className="p-4 text-left w-[10%]">番号</th>
              <th className="p-4 text-left w-auto">名前</th>
              <th className="p-4 text-left w-[20%]">メール</th>
              <th className="p-4 text-left w-[20%]"></th>
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
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default UserTable;