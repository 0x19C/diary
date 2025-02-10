"use client";

import React, { useEffect } from "react";
import { useDiaryStore } from "@/store/diary";
import { DashboardPagination } from "@/components/pagination";
import ManagerDashboardTable from "@/components/table/dashboardTable";
import { useRouter } from "next/navigation";
import { Diary, User } from "@/api/common";
import { useAuthStore } from "@/store/auth";
import { userStore } from "@/store/user";
import UserTable from "@/components/table/userTable";


const Page = () => {
  const { last_page, current_page, per_page, users, listUser, removeUser } = userStore();
 
    const { isLoggedIn } = useAuthStore();
  
  const Header = [
    { field: "userid", label: "ID", sortable: true },
    { field: "is_open", label: "公 開", sortable: true },
    { field: "farm_name", label: "農 場 名", sortable: true, fill: true },
    { field: "agr_officeid", label: "担 当 者 名", sortable: true },
  ]
    const router = useRouter();
  useEffect(() => {
    
    console.log(isLoggedIn,'isLoggedIn')
    if(!isLoggedIn) {
      router.push('/login')
    }
  },[isLoggedIn])
  useEffect(() => {
    listUser(current_page, per_page);
  }, [current_page, per_page, listUser]);

  const handleDelete  = async (user: User) => {
    try {
      await removeUser(user.id);
    } catch(error) {
      console.error(error);
    }
  }

  if (!users) return <div>loading...</div>;
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
              listUser(page, per_page)
            }
            onSelectPerPage={(per) =>
              listUser(1, per)
            }
          />
        </div>
        
        <UserTable
          editable={false}
          header={Header}
          data={users}
          sort_field=""
          sort_order=""
          onDelete={handleDelete}
        />

      </section>
    </>
  );

};

export default Page;
