"use client";

import ImageUploadInput from "@/components/input/imageUploadInput";
import { LoadingOverlay } from "@/components/overlay";
import { useDiaryStore } from "@/store/diary";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

const Page: React.FC = () => {
  const router = useRouter();
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { isLoading, createDiary } = useDiaryStore();
  const handleCreateDiaryButtonClick = () => {
    const formData = new FormData();
    formData.append("summary", summary);
    if (files.length) {
      formData.append(`file`, files[0]);
    }

    createDiary(formData)
      .then((res) => {
        setError("");
        setMessage(res.message);
        setTimeout(() => {
          router.push("/diary");
        }, 1500);
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
              <td>内容</td>
              <td>
                <textarea
                  id="summary"
                  placeholder=""
                  className="p-2 border border-gray-300 focus:outline-none w-full my-2"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>画像</td>
              <td>
                <ImageUploadInput files={files} onChange={setFiles} />
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
          onClick={handleCreateDiaryButtonClick}
        >
          作成
        </button>
      </div>
      <LoadingOverlay isOpen={isLoading} />
    </Suspense>
  );
};
export default Page;
