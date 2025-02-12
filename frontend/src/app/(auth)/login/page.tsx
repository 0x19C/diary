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
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { isLoading, actionLoginWithCredential, actionWhoAmICredential } =
    useAuthStore();

  const handleLoginButtonClicked = async () => {
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
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", pwd);

    await actionLoginWithCredential(formData)
      .then((res) => {
        setError("");
        setMessage(res.message);
      })
      .catch((_) => {
        setMessage("");
        setError("「メールアドレス」もしくは「パスワード」が間違っています。");
      })
      .finally(() => {});
    await actionWhoAmICredential()
      .then((res) => {
        setError("");
        setMessage(res.message);
        if (res.data?.is_admin) {
          router.push("/users");
        } else {
          router.push("/diary");
        }
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
              <td>メールアドレス</td>
              <td>
                <input
                  id="email"
                  type="email"
                  placeholder=""
                  className="p-2 border border-gray-300 focus:outline-none w-full my-2"
                  value={email}
                  onChange={(e) => {
                    setError("");
                    setMessage("");
                    setEmail(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setError("");
                    setMessage("");
                    setPwd(e.target.value);
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
      <div className="my-2 w-full">
        <button
          className="w-full bg-green-default text-white py-2"
          onClick={handleLoginButtonClicked}
        >
          ログイン <FontAwesomeIcon icon={faRightToBracket} />
        </button>
      </div>
      <Link
        href={"/register"}
        className="text-center block text-green-default mt-5"
      >
        登録ページへ <FontAwesomeIcon icon={faArrowRight} />
      </Link>
      <LoadingOverlay isOpen={isLoading} />
    </Suspense>
  );
};
export default Page;
