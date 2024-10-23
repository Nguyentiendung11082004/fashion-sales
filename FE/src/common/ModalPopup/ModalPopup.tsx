import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Modal as AntModal, Button } from "antd";
import { CloseOutlined, MinusOutlined } from "@ant-design/icons";
import HeartBlack from "@/components/icons/detail/HeartBlack";
import HeartRedPopup from "@/components/icons/detail/HeartRedPopup";

// Component AddToCartModal sử dụng forwardRef để truyền ref từ cha
const ModalPopup = forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // Hàm mở modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const handleClose = () => {
    setIsModalOpen(false);
  };

  // Dùng useImperativeHandle để truyền hàm showModal cho component cha
  useImperativeHandle(ref, () => ({
    showModal,
  }));

  return (
    <AntModal
      open={isModalOpen}
      onCancel={handleClose}
      footer={false}
      closable={false}
      maskClosable={false}
      className="rounded-xl"
      width={400}
    >
      <div className="p-2">
        {/* Nút đóng ở góc phải */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <CloseOutlined className="text-lg" />
        </button>

        <div>
          {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Add to Cart</h2> */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Chân váy</h2>
          <span className="text-2xl text-[#696969]">200.000 đ</span>
          {/* Chọn màu */}
          <div className="my-4">
            <p className="font-medium">Màu sắc</p>
            <div className="flex mt-3 gap-2">
              {["Red", "Blue", "Green"].map((color: any) => (
                <div
                  key={color}
                  className={`relative flex-1 max-w-[75px] h-8 sm:h-8 rounded-full border-2 cursor-pointer ${
                    selectedColor === color ? "border-black" : ""
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Chọn kích thước */}
          <div className="mb-6">
            <p className="font-medium">Kích thước</p>
            <div className="flex mt-3 gap-2">
              {["S", "M", "L"].map((size: any) => (
                <button
                  key={size}
                  className={`relative flex-1 max-w-[75px] h-8 sm:h-8 rounded-full border-2 cursor-pointer ${
                    selectedSize === size ? "border-black bg-gray-100" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="hd-quantity-item flex items-center">
            <div className="hd-quantity mb-2 relative block min-w-[120px] w-[120px] h-10 hd-all-btn">
              <button
                type="button"
                className="hd-btn-item left-0 text-left pl-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
              >
                <MinusOutlined />
              </button>
              <span className="select-none leading-9 cursor-text font-semibold text-base">
                1
              </span>
              <button
                type="button"
                className="hd-btn-item right-0 text-right pr-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-3 hd-all-hover-bluelight"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
            <div className="mx-5 mb-[2px]">
              <button>
                <HeartBlack />
                {/* <HeartRedPopup /> */}
              </button>
            </div>
          </div>

          {/* Nút Add to Cart */}
          <Button
            onClick={handleClose}
            className="h-12 w-full mt-4 rounded-full bg-[#56cfe1] text-white text-lg font-medium hover:bg-[#4bc3d5]"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </AntModal>
  );
});

export default ModalPopup;
