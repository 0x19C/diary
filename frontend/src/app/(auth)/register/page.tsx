"use client";

import { LoadingOverlay } from "@/components/overlay";
import { useAuthStore } from "@/store/auth";
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
    if (pwd !== cpwd) {
      setMessage("");
      setError("Confirm password is not matched.");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", pwd);
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
              <td>Name</td>
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
              <td>Email</td>
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
          登録
        </button>
      </div>
      <LoadingOverlay isOpen={isLoading} />
    </Suspense>
  );
};
export default Page;
