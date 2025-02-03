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
}: Readonly<{
  data: IDataEntry;
  disableClone?: boolean;
  disableDelete?: boolean;
  editable?: boolean;
  onEdit: (data: any) => void;
  onDuplicate: (data: any) => void;
  onDelete: (data: any) => void;
}>) => {
  const { fields } = data;

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
    <tr className="border-t border-gray-default" style={{ background: data.background || 'transparent' }}>
      {fields.map((_f, j) => (
        <td
          key={j}
          className={clsx(
            "p-4 text-sm whitespace-nowrap",
            _f.width ? `w-${_f.width}` : ""
          )}
        >
          <span>{_f.value}</span>
        </td>
      ))}
      
    </tr>
  );
};

const SortIcon = ({
  sorted,
  direction,
  field,
  onChange,
}: Readonly<{
  sorted: boolean;
  field: string;
  direction?: string;
  onChange?: (sort_field: string, sort_order: string) => void;
}>) => {
  
  return (
    <div className="text-xs cursor-pointer" >
     
        <div>
          <div className="-my-2">
            <FontAwesomeIcon icon={faAngleUp} />
          </div>
          <div className="-my-2">
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div>
      
    </div>
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
  data: IDataEntry[];
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
        <table className="min-w-full">
          <thead>
            <tr>
              {header.map((_, i) => (
                <th
                  key={i}
                  className={clsx("p-4 text-left", {
                    "w-full": _.fill,
                  })}
                >
                  <div className="text-sm whitespace-nowrap flex items-center gap-2">
                    <span>{_.label}</span>
                    
                  </div>
                </th>
              ))}
              {editable && <th></th>}
            </tr>
          </thead>
          <tbody>
            {data.map((_r, i) => (
              <DashboardTableEntry
                key={i}
                data={_r}
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