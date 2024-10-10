/* eslint-disable @typescript-eslint/no-unused-vars */
import { Iproduct } from "@/common/types/products";
import { useQuery } from "@tanstack/react-query";
import { productShow_client } from "@/services/api/client/productClient.api";
import { Link, useParams } from "react-router-dom";
import CartDetail from "@/components/icons/detail/CartDetail";
import Eye from "@/components/icons/detail/Eye";
import HeartWhite from "@/components/icons/detail/HeartWhite";
import { ProductNext } from "@/components/icons";
import { Skeleton } from "antd";

const RelatedProducts = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        return await productShow_client(`${id}`);
      } catch (error) {
        throw Error("Call api thất bại");
      }
    },
  });
  console.log(data);

  if (isLoading) return <Skeleton />;
  if (isError) return <p>{error.message}</p>;

  const { product, productRelated } = data || {};

  if (!productRelated || productRelated.length === 0) {
    return <p>Không có sản phẩm nào liên quan.</p>;
  }

  return (
    <div className="container m-auto mb-[50px] mt-10">
      <p className="lg:text-2xl sm:text-xl text-base mb-[30px] font-semibold m-auto text-center">
        Các sản phẩm liên quan
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {productRelated.map((relatedProduct: Iproduct) => (
          <div key={relatedProduct.id} className="lg:mb-[25px] mb-[20px]">
            <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
              <img
                className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                src={relatedProduct.img_thumbnail}
                alt={relatedProduct.name}
              />
              <img
                className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                src={ProductNext}
                alt={relatedProduct.name}
              />
              <div>
                <Link to="" className="absolute left-5 top-5">
                  <HeartWhite />
                </Link>
              </div>
              <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                <Link
                  to={`/products/${relatedProduct.id}`}
                  className="group/btn relative m-auto"
                >
                  <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                    <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                      Xem thêm
                    </p>
                    <Eye />
                  </button>
                </Link>
                <Link to="" className="group/btn relative">
                  <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                    <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                      Thêm vào giỏ hàng
                    </p>
                    <CartDetail />
                  </button>
                </Link>
              </div>
              <div className="absolute bottom-2 left-[35%] text-white -translate-y-7 transform transition-all duration-500 ease-in-out group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                <ul className="flex">
                  <li>
                    <Link to="">XS,</Link>
                  </li>
                  <li>
                    <Link to="">S,</Link>
                  </li>
                  <li>
                    <Link to="">M,</Link>
                  </li>
                  <li>
                    <Link to="">L,</Link>
                  </li>
                  <li>
                    <Link to="">XL</Link>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                -15%
              </div>
            </div>
            <div>
              <p className="text-sm text-black mb-1">{relatedProduct.name}</p>
              <del className="mr-1">{relatedProduct.price_regular}</del>
              <span className="text-[red]">{relatedProduct.price_sale}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
