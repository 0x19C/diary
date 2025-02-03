"use client";

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  ChangeEvent,
  DragEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export async function getBase64(file: File) {
  return new Promise<string | null>((resolve) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result as string);
    };
    reader.onerror = function (_) {
      resolve(null);
    };
    reader.readAsDataURL(file);
  });
}

const ImageFileItem = ({
  file,
  onDelete,
}: Readonly<{
  file: File;
  onDelete: () => void;
}>) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const res = await getBase64(file);
      setImageUrl(res);
    })();
  }, [file]);
  return (
    <div className="py-3 flex items-center gap-3">
      <div className="relative w-32 h-20 rounded-lg overflow-hidden">
        {imageUrl && (
          <Image src={imageUrl || ""} fill alt="" className="object-cover" />
        )}
      </div>
      <div className="flex-1">
        <h1 className="whitespace-nowrap overflow-hidden text-ellipsis text-gray-dark ">
          {file.name}
        </h1>
        <h1 className="text-gray-dark ">{file.size}Bytes</h1>
      </div>
      <div className="">
        <button
          onClick={onDelete}
          className="duration-300 w-8 h-8 border border-gray-default rounded-full hover:bg-gray-default text-sm text-gray-default hover:text-black-default"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

const ImageUploadInput = ({
  label = "",
  description = "",
  multiple = false,
  files = [],
  onChange,
}: Readonly<{
  label?: string;
  description?: string | ReactNode;
  multiple?: boolean;
  files?: File[];
  onChange: (files: File[]) => void;
}>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const updateUploadedFiles = (files: File[]) => {
    onChange(files);
  };

  const fileChanged = (files: FileList) => {
    try {
      const count = files.length;
      if (!count) return;
      if (!multiple) {
        updateUploadedFiles([files[0]]);
        return;
      }
      const _files: File[] = [];
      for (let i = 0; i < count; i++) {
        const file = files[i];
        _files.push(file);
      }
      updateUploadedFiles(_files);
    } catch (_) {}
  };

  const handleDrop = (e: DragEvent<HTMLInputElement>) => {
    fileChanged(e.dataTransfer.files);
    preventDefault(e);
  };

  const handleFileChanged = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    fileChanged(e.target.files);
  };

  const preventDefault = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDelete = (index: number) => {
    const _files = [...files];
    _files.splice(index, 1);
    onChange(_files);
  };

  return (
    <div>
      <h1 className="text-sm">{label}</h1>
      <div
        className="border border-gray-default rounded-md h-20 flex flex-col items-center justify-center text-sm"
        onDragEnter={preventDefault}
        onDragOver={preventDefault}
        onDrop={handleDrop}
      >
        <div>
          <span>画像をこちらにドロップするか、</span>
          <button className="font-bold" onClick={handleClick}>
            ファイル選択
          </button>
          <span>をクリック</span>
        </div>
        <div className="text-gray-dark ">{description}</div>
      </div>
      <div>
        {files.map((_, i) => (
          <ImageFileItem key={i} file={_} onDelete={() => handleDelete(i)} />
        ))}
      </div>
      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handleFileChanged}
        multiple={multiple}
        accept="image/png, image/gif, image/jpeg"
      />
    </div>
  );
};

export default ImageUploadInput;
