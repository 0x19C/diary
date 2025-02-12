"use client";

import { LoadingOverlay } from "@/components/overlay";
import { useAuthStore } from "@/store/auth";
import {
  faArrowRight,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

const Page: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCPwd] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { isLoading, actionRegisterWithCredential } = useAuthStore();

  const handleRegisterButtonClicked = () => {
    if (!name) {
      setError("「お名前」項目を入力してください。");
      return;
    }
    if (!email) {
      setError("「メールアドレス」項目を入力してください。");
      return;
    }
    if (!pwd) {
      setError("「パスワード」項目を入力してください。");
      return;
    }
    if (pwd.length < 8) {
      setError(
        "「パスワード」項目には半角英数字8文字以上を入力してください。"
      );
      return;
    }
    if (!cpwd) {
      setError("「スワードの確認」項目を入力してください。");
      return;
    }
    if (cpwd.length < 8) {
      setError(
        "「スワードの確認」項目には半角英数字8文字以上を入力してください。"
      );
      return;
    }
    if (pwd !== cpwd) {
      setError(
        "「スワード」項目と「スワードの確認」項目には同じパスワードを入力してください。"
      );
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", pwd);
    formData.append("password_confirmation", cpwd);
    actionRegisterWithCredential(formData)
      .then((res) => {
        setError("");
        setMessage(res.message);

        setTimeout(() => {
          router.push("/login");
        }, 500);
      })
      .catch((e) => {
        setMessage("");
        setError(e.message);
      })
      .finally(() => {});
  };
  return (
    <Suspense>
      <div className="my-5">
        <table className="w-full">
          <tbody>
            <tr>
              <td>お名前</td>
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
              <td>メールアドレス</td>
              <td>
                <input
                  id="email"
                  type="email"
                  placeholder=""
                  className="p-2 border border-gray-300 focus:outline-none w-full my-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>パスワード</td>
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
              <td>パスワードの確認</td>
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
      <div className="my-2 w-full">
        <button
          className="w-full bg-green-default text-white py-2"
          onClick={handleRegisterButtonClicked}
        >
          登録 <FontAwesomeIcon icon={faRightToBracket} />
        </button>
      </div>
      <Link
        href={"/login"}
        className="text-center block text-green-default mt-5"
      >
        ログインページへ <FontAwesomeIcon icon={faArrowRight} />
      </Link>
      <LoadingOverlay isOpen={isLoading} />
    </Suspense>
  );
};
export default Page;
