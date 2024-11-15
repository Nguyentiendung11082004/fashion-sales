import React, { useEffect } from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "../../../public/IsLoading-Lottie.json";

const Loading = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      className="z-50"
    >
      <div
        className="flex justify-center items-center"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Lottie animationData={LoadingAnimation} className="w-32" />
        <h1 style={{ color: '#fff', fontSize: '18px', marginTop: '', fontWeight: 600 }}>Đang xử lý...</h1>
      </div>
    </div>
  );
};

export default Loading;