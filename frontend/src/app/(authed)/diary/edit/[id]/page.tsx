"use client";

import ImageUploadInput from "@/components/input/imageUploadInput";
import { LoadingOverlay } from "@/components/overlay";
import { useDiaryStore } from "@/store/diary";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const EditDiaryPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const diaryId = pathname.split("/").pop();

  const { isLoading, updateDiary, getDiaryById } = useDiaryStore();
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);
  useEffect(() => {
    if (diaryId) {
      const fetchDiary = async () => {
        try {
          const diary = await getDiaryById(diaryId);
          if (diary) {
            setSummary(diary.summary || "");
            if (diary.file_path) {
              setExistingFileUrl(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/${diary.file_path}`
              );
            }
          }
        } catch (e) {
          setError("日記データのロードが失敗しました。");
          console.error(e);
        }
      };
      fetchDiary();
    }
  }, [diaryId]);
  const handleDeleteImage = () => {
    setExistingFileUrl(null);
    setMessage("Image removed successfully.");
  };
  const handleUpdateDiaryButtonClick = () => {
    if (!diaryId) return;
    if (!summary) {
      setMessage("「内容」項目を入力してください。");
      return;
    }
    if (summary.length > 255) {
      setMessage("「内容」項目に入力できる最大長さは｛255｝文字です。");
      return;
    }
    const formData = new FormData();
    formData.append("summary", summary);
    if (files.length) {
      formData.append(`file`, files[0]);
    }

    updateDiary(diaryId, formData)
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
      });
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
                  onChange={(e) => {
                    setMessage("");
                    setSummary(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>画像</td>

              <td>
                {existingFileUrl && (
                  <div className="my-2 flex justify-between">
                    <Image
                      src={existingFileUrl}
                      alt="Existing file"
                      height={200}
                      width={200}
                    />
                    <button
                      onClick={handleDeleteImage}
                      className="duration-300 w-8 h-8 border border-gray-default rounded-full my-auto hover:bg-gray-default text-sm text-gray-default hover:text-black-default"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                )}
                <ImageUploadInput
                  files={files}
                  onChange={(f) => {
                    setMessage("");
                    setFiles(f);
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
          className="w-full bg-blue-500 text-white py-2"
          onClick={handleUpdateDiaryButtonClick}
        >
          変更を保存
        </button>
      </div>
      <LoadingOverlay isOpen={isLoading} />
    </Suspense>
  );
};

export default EditDiaryPage;
