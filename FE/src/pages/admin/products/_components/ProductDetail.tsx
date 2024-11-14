import Loading from "@/common/Loading/Loading";
import { IProductVariant } from "@/common/types/products";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const ProductDetailAdmin = () => {
  const { id } = useParams();

  const {
    data: productShow,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["productShow", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await instance.get(`/products/${id}`);
      return response.data.product;
    },
    enabled: !!id,
  });

  console.log("productShow", productShow);
  if (isFetching) return <Loading />;

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-gray-300 pb-3">
          Chi tiết sản phẩm
        </h1>
      </div>

      <div className="max-w-4xl mx-auto my-auto bg-white p-6 rounded-lg shadow-md">
        {/* <!-- Product Image Section --> */}
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <img
              src={productShow.img_thumbnail}
              alt={productShow.name}
              className="rounded-lg w-full h-full object-cover"
            />
          </div>

          {/* <!-- Product Info Section --> */}
          <div className="w-full md:w-1/2 md:pl-6 mt-4 md:mt-0">
            {/* <div className="flex items-center justify-between"> */}
              <h1 className="text-2xl font-semibold text-gray-800">
                {productShow.name}
              </h1>

              
            {/* </div> */}
            <p className="text-2xl font-bold mt-3">
              {(productShow?.price_regular ||
                productShow?.variants?.length) && (
                <div>
                  {(() => {
                    const variants = productShow?.variants || [];
                    // Tính toán giá bán và giá gốc từ các biến thể
                    const minPriceSale = Math.min(
                      ...variants
                        .map((variant: any) => variant.price_sale)
                        .filter((price: any) => price >= 0)
                    );
                    const minPriceRegular = Math.min(
                      ...variants
                        .map((variant: any) => variant.price_regular)
                        .filter((price: any) => price >= 0)
                    );
                    const maxPriceRegular = Math.max(
                      ...variants
                        .map((variant: any) => variant.price_regular)
                        .filter((price: any) => price > 0)
                    );
                    const productPriceSale = productShow?.price_sale;
                    const productPriceRegular = productShow?.price_regular;

                    const pricesSaleVar = variants.map(
                      (variant: any) => variant.price_sale
                    );
                    const pricesRegularVar = variants.map(
                      (variant: any) => variant.price_regular
                    );
                    const allSaleEqual = pricesSaleVar.every(
                      (price: any) => price === pricesSaleVar[0]
                    );
                    const allRegularEqual = pricesRegularVar.every(
                      (price: any) => price === pricesRegularVar[0]
                    );

                    if (minPriceSale > 0) {
                      // Nếu có giá sale
                      if (
                        productPriceSale &&
                        productPriceSale < productPriceRegular
                      ) {
                        return (
                          <>
                            <del className="mr-1">
                              {new Intl.NumberFormat("vi-VN").format(
                                productPriceRegular
                              )}
                              ₫
                            </del>
                            <span className="text-[red]">
                              {new Intl.NumberFormat("vi-VN").format(
                                productPriceSale
                              )}
                              ₫
                            </span>
                          </>
                        );
                      } else if (
                        productPriceSale &&
                        productPriceSale === productPriceRegular
                      ) {
                        return (
                          <span className="text-blue-500">
                            {new Intl.NumberFormat("vi-VN").format(
                              productPriceRegular
                            )}
                            ₫
                          </span>
                        );
                      } else {
                        if (allSaleEqual && allRegularEqual) {
                          // Nếu tất cả giá sale và giá regular giống nhau
                          return (
                            <>
                              <del className="mr-1">
                                {new Intl.NumberFormat("vi-VN").format(
                                  pricesRegularVar[0]
                                )}{" "}
                                ₫
                              </del>
                              <span className="text-[red]">
                                {new Intl.NumberFormat("vi-VN").format(
                                  pricesSaleVar[0]
                                )}{" "}
                                ₫
                              </span>
                            </>
                          );
                        } else {
                          return (
                            <span className="text-blue-500">
                              {new Intl.NumberFormat("vi-VN").format(
                                minPriceSale
                              )}
                              ₫ -{" "}
                              {new Intl.NumberFormat("vi-VN").format(
                                maxPriceRegular
                              )}
                              ₫
                            </span>
                          );
                        }
                      }
                    } else {
                      return (
                        <span className="text-blue-500">
                          {new Intl.NumberFormat("vi-VN").format(
                            minPriceRegular
                          )}
                          ₫ -{" "}
                          {new Intl.NumberFormat("vi-VN").format(
                            maxPriceRegular
                          )}
                          ₫
                        </span>
                      );
                    }
                  })()}
                </div>
              )}
            </p>
            <p className="bg-gray-100 text-base flex p-4 rounded-lg mt-3">
               <p className="font-medium mr-1">Lượt xem:</p>  <span>100</span>
              </p>

            

            <p className=" bg-gray-100 text-base flex p-4 rounded-lg mt-3">
              <p className=" font-semibold mr-1">Mã sản phẩm: </p>
              {productShow.sku}
            </p>

            {/* Quantity */}
            <div className=" mt-4">
              <div className="bg-gray-100 text-base flex p-4 rounded-lg">
                <p className=" font-semibold mr-1">Số lượng: </p>
                {productShow?.variants
                  ? productShow.variants.reduce(
                      (total: number, variant: IProductVariant) =>
                        total + variant.quantity,
                      0
                    )
                  : productShow.quantity}
              </div>
            </div>

            <div className="mt-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <p className="text-base font-semibold ">
                    Trạng thái:
                  </p>
                  <span
                    className={`ml-1 ${productShow.status ? "text-green-600" : "text-red-600"}`}
                  >
                    {productShow.status ? "Còn hàng" : "Hết hàng"}
                  </span>
                </div>
                <div className="flex items-center">
                  <p className="text-base font-semibold">
                    Xu hướng:
                  </p>
                  <span
                    className={`ml-1 ${productShow.trend ? "text-green-600" : "text-gray-600"}`}
                  >
                    {productShow.trend ? "Có" : "Không"}
                  </span>
                </div>
                <div className="flex items-center">
                  <p className="text-base font-semibold ">Mới:</p>
                  <span
                    className={`ml-1 ${productShow.is_new ? "text-green-600" : "text-gray-600"}`}
                  >
                    {productShow.is_new ? "Có" : "Không"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-base font-semibold ">Thương hiệu:</p>
                <p className="text-sm text-gray-800">
                  {productShow.brand?.name}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-base font-semibold ">Danh mục:</p>
                <p className="text-sm text-gray-800">
                  {productShow.category?.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Product Attributes Section --> */}
        <div className="mt-8">
          <div>
          <h2 className="text-xl font-semibold text-gray-800">
              Mô tả sản phẩm
            </h2>
            <div className="mt-4 max-w-full text-base">
              <p className="text-gray-700 font-medium mt-2 break-words">
                {productShow.description_title}
              </p>
              <p className="text-gray-600 mt-1 break-words">
                {productShow.description}
              </p>
            </div>
          </div>
        
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Thuộc tính sản phẩm
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-base font-semibold text-gray-600">Màu sắc:</p>
                <p className="text-base text-gray-800">
                  {productShow.attributes.map((attr: any) => (
                    <p key={attr.id} className="text-gray-800">
                      <span className="font-medium text-gray-600">
                        {attr.value}
                      </span>
                    </p>
                  ))}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-base font-semibold text-gray-600">Kích cỡ:</p>
                <p className="text-base text-gray-800">
                  {productShow.attributes.map((attr: any) => (
                    <p key={attr.id} className="text-gray-800">
                      <span className="font-medium text-gray-600">
                        {attr.value}
                      </span>
                    </p>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Product Gallery Section --> */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Gallery sản phẩm
          </h2>
          <div
            className={`mt-4 flex ${productShow.galleries?.length >= 4 ? "overflow-x-scroll" : "justify-start gap-3"}`}
          >
            {productShow.galleries?.map((gallery: any) => (
              <img
                key={gallery.id}
                src={gallery.image}
                alt={`Gallery ${gallery.id}`}
                className="w-64 flex-shrink-0 object-cover rounded-md shadow-md mr-3"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailAdmin;
