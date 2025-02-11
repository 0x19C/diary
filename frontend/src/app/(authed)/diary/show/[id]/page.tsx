"use client";

import { LoadingOverlay } from "@/components/overlay";
import { useDiaryStore } from "@/store/diary";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const ShowDiaryPage: React.FC = () => {
  const pathname = usePathname();
  const diaryId = pathname.split("/").pop();
  const router = useRouter();
  const { isLoading, getDiaryById } = useDiaryStore();
  const [summary, setSummary] = useState("");
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
          setError("Failed to load diary details.");
          console.error(e);
        }
      };
      fetchDiary();
    }
  }, [diaryId]);

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
                  readOnly
                  onChange={(e) => setSummary(e.target.value)}
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
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-xs">
          {!!error && <h1 className="text-red-600 my-5">{error}</h1>}
        </div>
        <div className="my-2 w-full">
          <button
            className="w-full bg-green-default text-white py-2"
            onClick={() => router.back()}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-3" />
            戻る
          </button>
        </div>
      </div>

      <LoadingOverlay isOpen={isLoading} />
    </Suspense>
  );
};

export default ShowDiaryPage;
