/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal as AntModal, Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  onClose: () => void;
  dataOrderRequest: any;
};

const ReasonReturn = ({ open, onClose, dataOrderRequest }: Props) => {
  const navigate = useNavigate();
  const [reason, setReason] = useState<string>("");
  const onSelectOption = (option: string) => {
    if (typeof setReason === "function") {
      setReason(option);
    } else {
      console.error("setReason is not a valid function.");
    }
  };

  const checkListRequest = () => {
    if (reason) {
      navigate("/requestOrder", { state: { reason, dataOrderRequest } });
    } else {
      toast.error("Vui lòng chọn lí do hoàn hàng!!!");
    }
  };

  return (
    <div>
      {open && (
        <AntModal
          open={open}
          onCancel={onClose}
          footer={null}
          closable={false}
          maskClosable={false}
          className="custom-ant-modal"
          width={1100}
        >
          <div className="bg-white rounded-xl shadow-xl mx-auto p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Tình huống bạn đang gặp?
            </h2>
            <ul className="space-y-4">
              <li>
                <button
                  className={`w-full text-left p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                    reason ===
                    "Tôi đã nhận hàng nhưng hàng có vấn đề (bể vỡ, sai mẫu, hàng lỗi, khác mô tả...) - Miễn ship hoàn về"
                      ? "ring-2 ring-blue-400 "
                      : ""
                  }`}
                  onClick={() =>
                    onSelectOption(
                      "Tôi đã nhận hàng nhưng hàng có vấn đề (bể vỡ, sai mẫu, hàng lỗi, khác mô tả...) - Miễn ship hoàn về"
                    )
                  }
                >
                  <div className="font-medium text-gray-700">
                    Tôi đã nhận hàng nhưng hàng có vấn đề
                    <span className="block text-blue-600 font-bold">
                      (bể vỡ, sai mẫu, hàng lỗi, khác mô tả...) - Miễn ship hoàn
                      về
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Lưu ý: Trường hợp yêu cầu Trả hàng Hoàn tiền của bạn được
                    chấp nhận, Voucher có thể sẽ không được hoàn lại.
                  </p>
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                    reason === "Tôi nhận thiếu hàng"
                      ? "ring-2 ring-blue-400 "
                      : ""
                  }`}
                  onClick={() =>
                    onSelectOption("Tôi chưa nhận hàng/nhận thiếu hàng")
                  }
                >
                  <div className="font-medium text-gray-700">
                    Tôi nhận thiếu hàng
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Lưu ý: Trong trường hợp yêu cầu Trả Hàng Hoàn tiền của bạn
                    được chấp nhận, Voucher, Phí vận chuyển có thể
                    không được hoàn lại.
                  </p>
                </button>
              </li>
            </ul>
            <div className="flex justify-center items-center m-auto mt-4 text-center">
              <Button
                className="mx-2 bg-yellow-400 text-white"
                onClick={() => {
                  onClose();
                  if (typeof setReason === "function") {
                    setReason("");
                  }
                }}
              >
                Đóng
              </Button>

              <Button
                className="bg-red-500 text-white"
                onClick={checkListRequest}
              >
                Chọn
              </Button>
            </div>
          </div>
        </AntModal>
      )}
    </div>
  );
};

export default ReasonReturn;
