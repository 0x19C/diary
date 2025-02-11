import React from "react";

const Skeleton = () => {
  return (
    <div role="status" className="container animate-pulse mx-auto mt-20">
      <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-72 mb-4"></div>
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 max-w-[360px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;
