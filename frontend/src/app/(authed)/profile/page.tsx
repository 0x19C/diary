"use client";

import { LoadingOverlay } from "@/components/overlay";
import { useProfileStore } from "@/store/profile";
import { useEffect } from "react";
import { Suspense, useState } from "react";

const Page = () => {
  const [name, setName] = useState("");
  const [currentPwd, setCurrentPwd] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCPwd] = useState("");
  const [error, setError] = useState("");
  const { isLoading, actionGetProfile, actionUpdateProfile, actionChangePassword } = useProfileStore();
  const [message, setMessage] = useState("");

  useEffect(() => {
    actionGetProfile()
      .then((res) => {
        setError("");
        setName(res.data.name);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {});
  },[])

  const handleChangeProfile = async () => {
    actionUpdateProfile(name)
      .then((res) => {
        setError('');
        setMessage(res.message)
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {})
  }

  const handleChangePassword = async () => {
    actionChangePassword(currentPwd, pwd, cpwd)
      .then((res)=> {
        setError('');
        setMessage(res.message);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {})
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
              {!!error && <h1 className="text-red-600 my-5">{error}</h1>}
              {!!message && <h1 className="text-green-default">{message}</h1>}
            
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
          <LoadingOverlay isOpen={isLoading} />
        </Suspense>
      </div>
    </div>
   
  )
}

export default Page;
