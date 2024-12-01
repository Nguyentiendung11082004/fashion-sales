/* eslint-disable @typescript-eslint/no-explicit-any */
import { MinusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RequestOrder = () => {
  const location = useLocation();
  const reasonFromState = location.state?.reason;
  const dataOrder = location.state?.dataOrderRequest;
  const [selectedItems, setSelectedItems] = useState<boolean[]>(
    new Array(dataOrder?.order_details?.length).fill(false)
  );
  const [selectAll, setSelectAll] = useState(false);
  const [quantities, setQuantities] = useState<number[]>(
    new Array(dataOrder?.order_details?.length).fill(1)
  );

  const handleCheckboxChange = (index: number) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);

    const isAllSelected = newSelectedItems.every((item) => item === true);
    setSelectAll(isAllSelected);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    setSelectedItems(
      new Array(dataOrder?.order_details?.length).fill(isChecked)
    );
    setQuantities(new Array(dataOrder?.order_details?.length).fill(1));
  };

  const handleDecrease = (index: number) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index]--;
      setQuantities(newQuantities);
    }
  };
  const handleIncrease = (index: number) => {
    const newQuantities = [...quantities];

    const maxQuantity = dataOrder?.order_details[index]?.quantity;

    if (newQuantities[index] < maxQuantity) {
      newQuantities[index]++;
      setQuantities(newQuantities);
    }
  };
  const navigate = useNavigate();

  const isContinueDisabled = !selectedItems.includes(true);

  const handleContinue = () => {
    const selectedItemsData = dataOrder?.order_details?.filter(
      (_: any, index: number) => selectedItems[index]
    );

    if (selectedItemsData?.length > 0) {
      const items = selectedItemsData.map((item: any, index: number) => ({
        order_detail_id: item.id,
        quantity: quantities[index],
      }));

      navigate(`/return/request_order`, {
        state: { items, dataOrder, reasonFromState },
      });
    } else {
      toast.error("Vui lòng chọn ít nhất một sản phẩm.");
    }
  };

  return (
    <div className="mb-20px">
      <section className="w-full">
        <div className="hd-page-head">
          <div className="hd-header-banner bg-no-repeat bg-cover bg-center">
            <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 lg:py-[50px] mb-0 py-[30px]">
              <div className="z-[100] relative hd-container text-white">
                <h1 className="text-xl font-medium leading-5 mb-3">
                  Yêu cầu trả hàng hoàn tiền
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-4xl m-auto mt-8">
        <section className="hd-page-body text-[14px] lg:mt-[60px] mt-[30px] block m-0 p-0 border-0 isolate *:box-border">
          <div className="lg:flex-row justify-between items-center lg:items-start font-medium text-xl lg:text-2xl mb-8 text-gray-800 bg-white p-6 rounded-lg shadow-xl">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full mb-6">
              <div className="flex-shrink-0 text-center lg:text-left mb-4 lg:mb-0">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
                  Tình huống bạn đang gặp?
                </h2>
              </div>
            </div>

            <div className="text-gray-600 text-center lg:text-left mt-4 lg:mt-0">
              <p className="text-sm lg:text-base">{reasonFromState}</p>
            </div>
          </div>

          <div className="space-y-4 mb-[100px]">
            <p>
              Bạn có thể chọn một hoặc nhiều sản phẩm để yêu cầu trả hàng/hoàn
              tiền
            </p>

            {dataOrder?.order_details?.map((value: any, index: number) => (
              <div
                key={value.id}
                className="flex justify-between items-center p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-6">
                  <input
                    type="checkbox"
                    id={`product-${value.id}`}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500"
                    checked={selectedItems[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <Link
                    to={`/products/${value?.product_id}`}
                    className="flex-shrink-0"
                  >
                    <img
                      src={
                        value.product_img || "https://via.placeholder.com/100"
                      }
                      alt={value.product_name}
                      className="w-[100px] h-[100px] object-cover rounded-lg border border-gray-300"
                    />
                  </Link>

                  <div className="text-sm font-medium text-gray-800">
                    <Link
                      to={`/products/${value?.product_id}`}
                      className="text-lg font-semibold text-gray-900 hover:underline"
                    >
                      {value.product_name}
                    </Link>
                    <div className="mt-2 space-y-1 text-gray-600">
                      <span>Phân loại: </span>
                      {value.attributes &&
                        Object.entries(value.attributes).map(
                          ([key, val]: any) => (
                            <span key={key} className="capitalize mr-2">
                              {key} {val}
                            </span>
                          )
                        )}
                    </div>
                    <span className="block mt-2 text-base">
                      Số lượng: <span>{value?.quantity}</span>
                    </span>
                    <span className="block mt-2 text-base">
                      Giá: {Number(value.price).toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:pr-3.5 rounded-full">
                  <div className="nc-NcInputNumber flex items-center justify-between space-x-3 w-full border border-black px-2 py-2 rounded-full">
                    <div className="nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28">
                      <button
                        className="flex items-center justify-center bg-slate-100/70 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400"
                        type="button"
                        onClick={() => handleDecrease(index)}
                      >
                        <MinusOutlined className="w-4 h-4" />
                      </button>
                      <span className="select-none block flex-1 text-center font-semibold">
                        {quantities[index]}
                      </span>
                      <button
                        className="flex items-center justify-center bg-white focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                        type="button"
                        onClick={() => handleIncrease(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          className="w-4 h-4"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12 2a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8h-8a1 1 0 110-2h8V3a1 1 0 011-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className=" fixed bottom-0 left-[220px] right-[220px]  flex justify-between items-center p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="select-all"
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <label
                  htmlFor="select-all"
                  className="text-sm font-medium text-gray-800"
                >
                  Chọn tất cả
                </label>
              </div>

              <button
                className={`${isContinueDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white"} ml-auto px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105 active:scale-95`}
                disabled={isContinueDisabled}
                onClick={handleContinue}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RequestOrder;
