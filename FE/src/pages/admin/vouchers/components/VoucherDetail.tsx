/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
const VoucherDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["vouchers", id],
    queryFn: async () => {
      try {
        return await instance.get(`/vouchers/${id}`);
      } catch (error) {
        throw new Error("Error");
      }
    },
  });
  const { data: dataProducts } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        return await instance.get(`/products`);
      } catch (error) {
        throw new Error("Error");
      }
    },
  });

  const listProducts = dataProducts?.data?.data;
  console.log("listProduct", listProducts);

  console.log("dataProduct: ", dataProducts);

  console.log("data detail", data);
  const voucher = data?.data?.data?.voucher;
  const meta_data = data?.data?.data?.meta_data;
  console.log("voucher:", voucher);
  console.log("meta_data:", meta_data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <>
      <div className="p-6 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Chi tiết voucher
          </h1>
        </div>
        <div className="flex ">
          <>
            <div className="relative w-[600px] h-[300px] bg-yellow-300 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-16 flex items-center justify-center rounded-t-lg">
                <h2 className="text-white text-2xl font-bold">
                  Voucher giảm giá
                </h2>
              </div>

              <div className="flex flex-col items-center mt-10 h-full">
                <p className="text-gray-700 text-lg mb-2">Mã giảm giá:</p>
                <span className="text-4xl font-bold text-yellow-600 bg-white p-3 rounded-lg shadow-md">
                  {voucher.code}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-16 bg-yellow-200 flex items-center justify-between px-6">
                <span className="text-sm font-semibold text-gray-600">
                  Giảm: <span>{voucher.discount_value}</span>
                  <span>{voucher.discount_type == "fixed" ? "VNĐ" : "%"}</span>
                </span>
                <span className="text-sm font-semibold text-gray-600">
                  Từ
                  <span>
                    {dayjs(voucher.start_date).format(" DD/MM/YYYY HH:mm:ss ")}
                  </span>
                  đến
                  <span>
                    {dayjs(voucher.end_date).format(" DD/MM/YYYY HH:mm:ss ")}
                  </span>
                </span>
              </div>
            </div>
            <div className="ml-[100px] w-[50%] ">
              <h1 className="font-bold text-2xl mb-2">{voucher.title}</h1>
              <h2 className="mb-2">
                <span className="font-bold text-base">Mô tả: </span>
                <span className="text-base">{voucher.description}</span>
              </h2>
              <h2 className="text-base mb-2">
                <span className="font-bold">
                  Giá trị đơn hàng tối thiểu để giảm giá:
                </span>
                <span> {voucher.min_order_value}</span>
              </h2>
              <h2 className="text-base mb-2">
                <span className="font-bold">Số lượng:</span>
                <span> {voucher.usage_limit}</span>
              </h2>
              <h2 className="text-base mb-2">
                <span className="font-bold">Đã sử dụng:</span>
                <span> {voucher.used_count}</span>
              </h2>
              <h2 className="text-base mb-2">
                <span className="font-bold">Số lượng chưa sử dụng:</span>
                <span>
                  {Number(voucher.usage_limit) - Number(voucher.used_count) ===
                  0
                    ? " Đã hết"
                    : Number(voucher.usage_limit) - Number(voucher.used_count)}
                </span>
              </h2>
              <span className="font-bold">Đối tượng áp dụng giảm giá: </span>
              <div className="">
                {meta_data?.length === 0 ? (
                  <p>No data available</p>
                ) : (
                  meta_data.map((value: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 bg-white border border-gray-300 rounded-lg shadow-md mt-2"
                    >
                      <h2 className="text-base font-bold">{value.name}</h2>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {value.item_names?.map(
                          (name: any, nameIndex: number) => (
                            <div
                              key={nameIndex}
                              className="flex items-center justify-center p-2 bg-yellow-100 border border-yellow-300 rounded-lg text-center text-sm"
                            >
                              {name}
                            </div>
                          )
                        )}
                        {value.max_discount_amount && (
                          <div className="flex items-center justify-center p-2 bg-yellow-100 border border-yellow-300 rounded-lg text-center text-sm">
                            {value.max_discount_amount}
                          </div>
                        )}

                        {value.meta_key === "_voucher_product_ids" ||
                          (value.meta_key ===
                            "_voucher_exclude_product_ids" && (
                            <div className="flex items-center justify-center p-2 bg-yellow-100 border border-yellow-300 rounded-lg text-center text-sm">
                              {meta_data.meta_value?.map((dataMeta: any) =>
                                listProducts?.map((data: any) =>
                                  dataMeta === data.id ? (
                                    <div key={data.id}>
                                      <p>{data.name}</p>
                                    </div>
                                  ) : (
                                    ""
                                  )
                                )
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default VoucherDetail;
