import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-blue-500">404</h1>
        <p className="text-lg text-gray-700 mt-4">
          Oops! The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Go Back Home
        </a>
      </div>
    </>
  );
};

export default NotFound;