/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/common/context/Auth/AuthContext";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const Post = () => {
  const { token } = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        return await instance.get("/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log("error");
      }
    },
  });

  const posts = data?.data?.data;

  // Không render gì nếu đang loading hoặc không có dữ liệu
  if (isLoading || !posts || posts.length === 0) {
    return null;
  }


  // if (isLoading) return <div>isLoading...</div>;
  // if (isError) return <div>{error.message}</div>;
  return (
    <>
      <div className="container mt-28">
        <div className="custom-heading ">
          <div className="flex-auto items-center mx-auto">
            <div className="mx-4 text-2xl font-bold text-gray-900">
              BÀI VIẾT MỚI NHẤT
            </div>
          </div>
        </div>
        <div className="text-center mx-auto italic mt-2 custom-heading-sub mb-10">
          <i>Tin tức mới nhất và thú vị nhất</i>
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper grid grid-cols-1 lg:grid-cols-3 lg:gap-8 md:grid-cols-3 md:gap-4"
        >
          {posts &&
            posts.map((value: any) => (
              <SwiperSlide key={value.id}>
                <div className="overflow-hidden mt-4 lg:mt-0 md:mt-0 border relative h-[400px]">
                  <img
                    src={value.img_thumbnail}
                    className="hd-animation-border hover:scale-[1.2] w-full h-full object-cover transition-all ease-in-out duration-500"
                    alt="Thumbnail"
                  />
                </div>

                <h3 className="mt-4 font-semibold text-xl text-hover transition-all ease-in-out duration-200">
                  {value.post_name}
                </h3>
                {/* <p className="mt-2 mb-4">Thêm vào ngày 11 tháng 5 năm 2022</p> */}
                <span className="text-[#909090] ">
                  {value.post_content.length > 200
                    ? `${value.post_content.slice(0, 200)}...`
                    : value.post_content}
                </span>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default Post;
