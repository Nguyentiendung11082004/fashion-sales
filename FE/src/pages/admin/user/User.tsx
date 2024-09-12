import React from "react";

type Props = {};

const UserPage = (props: Props) => {
  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          Tài khoản
        </h1>
      </div>
    </div>
  );
};

export default UserPage;
