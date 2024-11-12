import { IProductVariant } from "@/common/types/products";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
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
  if (isFetching) return <Skeleton />;

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-gray-300 pb-3">
          Chi tiết sản phẩm
        </h1>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 grid grid-cols-12 gap-8">
        {/* Gallery Section */}
        <div className="col-span-3 flex flex-col items-center space-y-4">
          {productShow.galleries?.map((gallery: any) => (
            <img
              key={gallery.id}
              src={gallery.image}
              alt={`Gallery ${gallery.id}`}
              className="w-32 h-32 object-cover rounded-md shadow-md"
            />
          ))}
        </div>

        {/* Main Product Image */}
        <div className="col-span-5 flex justify-center items-center">
          <img
            src={productShow.img_thumbnail}
            alt={productShow.name}
            className="w-full h-auto object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* Product Info Section */}
        <div className="col-span-4 flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {productShow.name}
          </h2>

          <div className="text-gray-600 space-y-1">
            <p>
              SKU: <span className="font-medium">{productShow.sku}</span>
            </p>
          </div>

          {/* Price Display */}
          <p className="text-2xl font-bold">
            Giá sản phẩm:
            {(productShow?.price_regular || productShow?.variants?.length) && (
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
                        <span>
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
                          <span>
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
                      <span>
                        {new Intl.NumberFormat("vi-VN").format(minPriceRegular)}
                        ₫ -{" "}
                        {new Intl.NumberFormat("vi-VN").format(maxPriceRegular)}
                        ₫
                      </span>
                    );
                  }
                })()}
              </div>
            )}
          </p>

          {/* Quantity */}
          <p className="text-gray-500">
            Số lượng:{" "}
            {productShow?.variants
              ? productShow.variants.reduce(
                  (total: number, variant: IProductVariant) =>
                    total + variant.quantity,
                  0
                )
              : productShow.quantity}
          </p>

          {/* Product Description */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Mô tả sản phẩm
            </h3>
            <p className="text-gray-700 font-medium mt-2">
              {productShow.description_title}
            </p>
            <p className="text-gray-600 mt-1">{productShow.description}</p>
          </div>

          {/* Product Status */}
          <div className="space-y-2 mt-6">
            <div>
              <span className="font-semibold">Trạng thái:</span>{" "}
              <span
                className={`ml-1 ${productShow.status ? "text-green-600" : "text-red-600"}`}
              >
                {productShow.status ? "Còn hàng" : "Hết hàng"}
              </span>
            </div>
            <div>
              <span className="font-semibold">Xu hướng:</span>{" "}
              <span
                className={`ml-1 ${productShow.trend ? "text-green-600" : "text-gray-600"}`}
              >
                {productShow.trend ? "Có" : "Không"}
              </span>
            </div>
            <div>
              <span className="font-semibold">Mới:</span>{" "}
              <span
                className={`ml-1 ${productShow.is_new ? "text-green-600" : "text-gray-600"}`}
              >
                {productShow.is_new ? "Có" : "Không"}
              </span>
            </div>
          </div>

          {/* Brand and Category */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Thương hiệu:</h3>
            <p className="text-gray-800">{productShow.brand?.name}</p>

            <h3 className="text-lg font-semibold mt-4">Danh mục:</h3>
            <p className="text-gray-800">{productShow.category?.name}</p>
          </div>

          {/* Attributes */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Thuộc tính:</h3>
            {productShow.attributes.map((attr: any) => (
              <p key={attr.id} className="text-gray-800">
                {attr.name}:{" "}
                <span className="font-medium text-gray-600">{attr.value}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailAdmin;
