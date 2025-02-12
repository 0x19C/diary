"use client";

import { LoadingOverlay } from "@/components/overlay";
import { useProfileStore } from "@/store/profile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Suspense, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Page = () => {
  const [name, setName] = useState("");
  const [currentPwd, setCurrentPwd] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCPwd] = useState("");
  const [error, setError] = useState("");
  const { isLoading, actionGetProfile, actionChangePassword } =
    useProfileStore();
  const [message, setMessage] = useState("");
  const router = useRouter();

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
  }, []);

  const handleChangePassword = async () => {
    if (!currentPwd) {
      setError("「現在のパスワード」項目を入力してください。");
      return;
    }
    if (currentPwd.length < 8) {
      setError(
        "「現在のパスワード」項目には半角英数字8文字以上を入力してください。"
      );
      return;
    }
    if (!pwd) {
      setError("「新パスワード」項目を入力してください。");
      return;
    }
    if (pwd.length < 8) {
      setError(
        "「新パスワード」項目には半角英数字8文字以上を入力してください。"
      );
      return;
    }
    if (!cpwd) {
      setError("「新パスワードの確認」項目を入力してください。");
      return;
    }
    if (cpwd.length < 8) {
      setError(
        "「新パスワードの確認」項目には半角英数字8文字以上を入力してください。"
      );
      return;
    }
    if (pwd !== cpwd) {
      setError(
        "「新パスワード」項目と「新パスワードの確認」項目には同じパスワードを入力してください。"
      );
      return;
    }
    actionChangePassword(currentPwd, pwd, cpwd)
      .then((res) => {
        setError("");
        setMessage(res.message);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {});
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="border border-green-default p-5 min-w-[500px]">
        <Suspense>
          <div className="my-5">
            <h1 className="text-2xl font-bold mb-5">パスワードの変更</h1>
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
                      readOnly
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
                      onChange={(e) => {
                        setError("");
                        setMessage("");
                        setCurrentPwd(e.target.value);
                      }}
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
                      onChange={(e) => {
                        setError("");
                        setMessage("");
                        setPwd(e.target.value);
                      }}
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
                      onChange={(e) => {
                        setError("");
                        setMessage("");
                        setCPwd(e.target.value);
                      }}
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
                onClick={() => router.back()}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-3" />
                戻る
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
  );
};

export default Page;
