import { Icategories } from "@/common/types/categories";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Đảm bảo bạn đã cài đặt react-router-dom

const CategoryCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<Icategories[]>([]);
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: -250,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: 250,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/product-home")
      .then((response) => {
        setCategory(response.data.categories);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy danh mục", error);
      });
  }, []);

  const handleCategoryClick = () => {
    setSelectedCategories([categoryId]);
    applyFilters([categoryId]);
    navigate("/products");
  };

  return (
    <section className="container relative overflow-hidden">
      <button
        className="absolute left-[-2px] h-14 top-1/2 transform -translate-y-1/2 bg-slate-800 bg-opacity-5 p-2"
        onClick={scrollLeft}
      >
        &#8249; {/* Ký tự mũi tên trái */}
      </button>

      <button
        className="absolute right-[-2px] h-14 top-1/2 transform -translate-y-1/2 bg-slate-800 bg-opacity-5 p-2"
        onClick={scrollRight}
      >
        &#8250; {/* Ký tự mũi tên phải */}
      </button>

      <div
        ref={scrollContainerRef}
        style={{ scrollbarWidth: "none" }}
        className="flex space-x-[2px] mt-10 overflow-x-auto scroll-smooth"
      >
        {category.map((cat) => (
          <div key={cat.id} className="min-w-[250px] h-[500px] overflow-hidden">
            <Link
              to={{
                pathname: "/products",
              }}
              state={{ selectedCategoryId: cat.id }}
              className="relative"
            >
              <img
                src={cat.img_thumbnail}
                alt={cat.name}
                className="h-full w-full hover:scale-110 transition-all duration-700 ease-in-out object-cover "
              />
              <button className="shadow-sm absolute bottom-[4%] left-[50%] -translate-x-[50%] bg-[#fff] text-[#000] hover:bg-[#000] hover:text-[#fff] transition ease-in duration-300 w-[150px] h-[40px] font-bold text-lg">
                {cat.name}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCarousel;
