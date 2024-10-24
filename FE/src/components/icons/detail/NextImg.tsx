import React from "react";

type Props = {};

const NextImg = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-10 w-10 transition-all duration-300 ease-in-out border text-gray-400 border-gray-400 hover:border-black p-2 rounded-full hover:text-black"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

export default NextImg;
