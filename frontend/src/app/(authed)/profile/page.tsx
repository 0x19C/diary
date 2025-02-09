"use client";

import { changePassword, getProfile, updateProfile } from "@/api/profile";
import { useEffect } from "react";
import { Suspense, useState } from "react";

const Page = () => {
  const [name, setName] = useState("");
  const [currentPwd, setCurrentPwd] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCPwd] = useState("");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setName(response.name || "");
        console.log('profile', response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchProfile()
  },[])

  const handleChangeProfile = async () => {
    try {
      const response = await updateProfile(name);
      setName(response.name);
    } catch(e) {
      console.error(e);
    }
  }

  const handleChangePassword = async () => {
    try {
      const response = await changePassword(currentPwd, pwd, cpwd)
      console.log(response)
      setPwd("");
      setCurrentPwd('');
      setCPwd("")
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center" >
      <div className="border border-green-default p-5 min-w-[500px]">
      <Suspense>
      <div className="my-5">
        <table className="w-full">
          <tbody>
            <tr>
              <td>名前</td>
              <td>
                <input
                  id="name"
                  type="text"
                  placeholder=""
                  className="p-2 border border-gray-300 focus:outline-none w-full my-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>現在のパスワード</td>
              <td>
                <input
                  id="current_password"
                  type="password"
                  placeholder=""
                  className="p-2 border border-gray-300 focus:outline-none w-full my-2"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>新パスワード</td>
              <td>
                <input
                  id="pwd"
                  type="password"
                  placeholder=""
                  className="p-2 border border-gray-300 focus:outline-none w-full my-2"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>新パスワードの確認</td>
              <td>
                <input
                  id="cpwd"
                  type="password"
                  placeholder=""
                  className="p-2 border border-gray-300 focus:outline-none w-full my-2"
                  value={cpwd}
                  onChange={(e) => setCPwd(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-xs">
         
        </div>
      </div>
      <div className="flex just-between gap-2">
      <div className="my-2 w-1/2">
        <button
          className="w-full bg-green-default text-white py-2"
          onClick={() => handleChangeProfile()}
        >
          変更
        </button>
      </div>
      <div className="my-2 w-1/2">
        <button
          className="w-full bg-green-default text-white py-2"
          onClick={() => handleChangePassword()}
        >
          パスワードの変更
        </button>
      </div>
      </div>
      
    </Suspense>
      </div>
    </div>
   
  )
}

export default Page;
