"use client";

import ImageUploadInput from "@/components/input/imageUploadInput";
import { LoadingOverlay } from "@/components/overlay";
import { useDiaryStore } from "@/store/diary";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, usePathname  } from "next/navigation";
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
    console.log(diaryId)
    if (diaryId) {

      const fetchDiary = async () => {
        try {
          const diary = await getDiaryById(diaryId);
          console.log(diary,'DDD', diaryId)
          if (diary) {
            setSummary(diary.summary || "");
            if (diary.file_path) {
              setExistingFileUrl(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/${diary.file_path}`);
            }
          }
        } catch (e) {
          setError("Failed to load diary details.");
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
    const formData = new FormData();
    console.log(summary,'DD')
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
              <td>Summary</td>
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
              <td>Image</td>
              
              <td>
              {existingFileUrl && (
                  <div className="my-2 flex justify-between">
                    <img
                      src={existingFileUrl}
                      alt="Existing file"
                      className="w-32 h-20"
                    />
                    <button
                      onClick={handleDeleteImage}
                      className="duration-300 w-8 h-8 border border-gray-default rounded-full my-auto hover:bg-gray-default text-sm text-gray-default hover:text-black-default"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                )}
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
          className="w-full bg-blue-500 text-white py-2"
          onClick={handleUpdateDiaryButtonClick}
        >
          Save Changes
        </button>
      </div>
      <LoadingOverlay isOpen={isLoading} />
    </Suspense>
  );
};

export default EditDiaryPage;
