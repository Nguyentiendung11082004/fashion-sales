/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { colorTranslations } from "@/common/colors/colorUtils";

import { ResponseData } from "@/common/types/responseDataFilter";
import CartDetail from "@/components/icons/detail/CartDetail";
import Eye from "@/components/icons/detail/Eye";

import HeartWhite from "@/components/icons/detail/HeartWhite";
import Less from "@/components/icons/detail/Less";
import NoDatasIcon from "@/components/icons/products/NoDataIcon";
import instance from "@/configs/axios";

import { useCart } from "@/common/context/Cart/CartContext";
import { useWishlist } from "@/common/context/Wishlist/WishlistContext";
import HeartRed from "@/components/icons/detail/HeartRed";
import CartPopup from "@/components/ModalPopup/CartPopup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "rc-slider/assets/index.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import unorm from "unorm";
import DetailPopup from "@/components/ModalPopup/DetailPopup";

const Products = () => {
  const location = useLocation();
  const [growboxDropdownOpen, setGrowboxDropdownOpen] = useState(false);
  const [toepfeDropdownOpen, setToepfeDropdownOpen] = useState(false);
  const growboxRef = useRef<HTMLDivElement>(null);
  const toepfeRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [noProductsMessage, setNoProductsMessage] =
    useState<React.ReactNode>(null);
  const { handleAddToWishlist, isInWishlist } = useWishlist();
  const [allproducts, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const selectedCategoryId = location.state?.selectedCategoryId || null;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [appliedBrands, setAppliedBrands] = useState<string[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, any[] | undefined>
  >({});
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const saleFromLink = location.state?.sale || false;
  const [isSale, setIsSale] = useState<boolean>(saleFromLink);
  const [selectedSortName, setSelectedSortName] = useState("");
  const [temporarySortName, setTemporarySortName] = useState("");
  const [slugProduct, setSlugProduct] = useState<string>("");

  const [selectedSort, setSelectedSort] = useState<{
    trend: boolean;
    sortDirection: string | null;
    sortPrice: string | null;
    sortAlphaOrder: string | null;
  }>({
    trend: false,
    sortDirection: null,
    sortPrice: null,
    sortAlphaOrder: null,
  });
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (filters: any) => {
      const response = await instance.post("/product-shop", filters, {
        timeout: 5000,
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["productsData"], data);
      if (data.products.length === 0) {
        setNoProductsMessage(
          <div className="flex flex-col items-center ">
            <NoDatasIcon />
            <span className="text-gray-500 text-lg">
              Không có sản phẩm nào!
            </span>
          </div>
        );
      } else {
        setNoProductsMessage(null);
      }
    },
    onError: (error) => {
      console.error("Có lỗi xảy ra:", error);
    },
  });
  const applyFilters = useCallback(() => {
    const filters = {
      search: searchTerm || null,
      categorys: selectedCategories.length ? selectedCategories : null,
      brands: selectedBrand.length ? selectedBrand : null,
      attributes: Object.keys(selectedAttributes).length
        ? selectedAttributes
        : null,
      min_price: minPrice || null,
      max_price: maxPrice || null,
      sale: isSale || null,
      trend: selectedSort.trend || null,
      sortDirection: selectedSort.sortDirection || null,
      sortPrice: selectedSort.sortPrice || null,
      sortAlphaOrder: selectedSort.sortAlphaOrder || null,
    };

    // Xóa các key có giá trị null
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== null)
    );

    mutate(cleanedFilters);
    setAppliedBrands(selectedBrand);
    setSelectedSortName(temporarySortName);
    setGrowboxDropdownOpen(false);
    setToepfeDropdownOpen(false);
  }, [
    searchTerm,
    selectedCategories,
    selectedBrand,
    selectedAttributes,
    minPrice,
    maxPrice,
    isSale,
    selectedSort,
    temporarySortName,
    mutate,
  ]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedBrand([]);
    setSelectedAttributes({});
    setMinPrice("");
    setMaxPrice("");
    setIsSale(false);
    setSelectedSort({
      trend: false,
      sortDirection: null,
      sortPrice: null,
      sortAlphaOrder: null,
    });
    applyFilters();
    setAppliedBrands([]);
    setTemporarySortName("");
    setSelectedSortName("");
    setGrowboxDropdownOpen(false);
    setToepfeDropdownOpen(false);
  };

  useEffect(() => {
    if (saleFromLink) {
      setIsSale(true);
      applyFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saleFromLink]);

  useEffect(() => {
    if (selectedCategoryId) {
      setSelectedCategories([selectedCategoryId.toString()]);
    }
  }, [selectedCategoryId]);

  const handleCheckboxChange = (name: string, value: any) => {
    console.log(`Checkbox changed: ${name} -> ${value}`);

    if (Object.keys(pro?.attributes || {}).includes(name)) {
      setSelectedAttributes((prev) => {
        const prevValues = prev[name] || [];
        const newValues = prevValues.includes(value)
          ? prevValues.filter((v) => v !== value) // Bỏ chọn
          : [...prevValues, value]; // Chọn

        return {
          ...prev,
          [name]: newValues.length ? newValues : undefined, // Xóa key nếu giá trị rỗng
        };
      });

      // Gọi hàm lọc sau khi cập nhật
      applyFilters();
      return;
    }

    switch (name) {
      case "categories":
        setSelectedCategories((prev) => {
          const newCategories = prev.includes(value)
            ? prev.filter((id) => id !== value) // Bỏ chọn
            : [...prev, value]; // Chọn
          applyFilters(); // Gọi hàm lọc ngay sau khi cập nhật
          return newCategories;
        });
        break;
      case "brands":
        setSelectedBrand((prev) => {
          const newBrands = prev.includes(value)
            ? prev.filter((brand) => brand !== value)
            : [...prev, value];

          return newBrands;
        });
        break;
      case "sale":
        setIsSale((prev) => {
          const newSale = !prev;
          if (!newSale) {
            navigate("/products");
          }
          applyFilters();
          return newSale;
        });
        break;
      default:
        break;
    }
  };
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    applyFilters();
  }, [selectedCategories, selectedAttributes, isSale]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const trimmedValue = value.trimStart(); // Loại bỏ khoảng trắng đầu

    if (trimmedValue === "") {
      setSuggestions([]);
      setNoProductsMessage(null);
      queryClient.invalidateQueries({ queryKey: ["productsData"] });
    } else {
      const fetchSuggestions = async () => {
        const response = await instance.post("/product-shop", {
          search: trimmedValue, // Gửi mảng từ khóa lên server
        });
        const suggestionsData = response.data.products.map(
          (item: any) => item.product.name
        );

        const filteredSuggestions = suggestionsData.filter(
          (suggestion: string) => {
            const removeDiacritics = (str: string) =>
              unorm.nfkd(str).replace(/[\u0300-\u036f]/g, "");

            const normalizedSuggestion =
              removeDiacritics(suggestion).toLowerCase();
            const normalizedValue =
              removeDiacritics(trimmedValue).toLowerCase();

            console.log("Suggestion:", suggestion);
            console.log("Normalized Suggestion:", normalizedSuggestion);
            console.log("Normalized Value:", normalizedValue);

            return normalizedSuggestion.startsWith(normalizedValue);
          }
        );

        console.log("Filtered Suggestions:", filteredSuggestions);

        setSuggestions(filteredSuggestions);
      };
      fetchSuggestions();
    }
  };
  const [idProduct, setIdProduct] = useState<any>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestions([]);
    applyFilters();
  };

  // data
  const { data: pro, isFetching } = useQuery<ResponseData>({
    queryKey: ["productsData"],
    queryFn: async () => {
      const response = await instance.post("/product-shop");
      return response.data;
    },
  });

  const toggleGrowboxDropdown = () => {
    setGrowboxDropdownOpen(!growboxDropdownOpen);
    setToepfeDropdownOpen(false);
  };
  const toggleToepfeDropdown = () => {
    setToepfeDropdownOpen(!toepfeDropdownOpen);
    setGrowboxDropdownOpen(false);
  };
  const handleClickOutside = (event: any) => {
    if (growboxRef.current && !growboxRef.current.contains(event.target)) {
      setGrowboxDropdownOpen(false);
    }
    if (toepfeRef.current && !toepfeRef.current.contains(event.target)) {
      setToepfeDropdownOpen(false);
    }
  };
  // thêm vào giỏ hàng
  const { addToCart } = useCart();
  const onHandleAddToCart = (
    idProduct: any,
    idProductVariant: any,
    quantity: any
  ) => {
    // if (data.getUniqueAttributes == 0) {
    //   idProductVariant = undefined;
    // }
    addToCart(idProduct, idProductVariant, quantity);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const buyNow = (idPr: any, qty: number) => {
    navigate("/checkout", { state: { cartId: idPr } });
  };
  const modalRef = useRef<HTMLDialogElement | null>(null); // ref để điều khiển modal
  const [isModalOpen, setIsModalOpen] = useState(false); // state để kiểm soát việc mở modal

  const handleOpenModal = () => {
    setIsModalOpen(true); // Mở modal khi nhấn nút
    if (modalRef.current) {
      modalRef.current.showModal(); // Sử dụng showModal để hiển thị modal
    }
  };
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const productsPerPage = 12; // Mỗi trang có 12 sản phẩm
  const totalProducts = pro?.products?.length || 0; // Tổng số sản phẩm
  // Tính toán các sản phẩm hiển thị trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = pro?.products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  // Tính số trang
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  // Hàm để chuyển trang
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [visiable, setVisible] = useState(false);
  const [productSeeMore, setProductSeeMore] = useState({});
  const handleOpenSeeMore = (product: any) => {
    console.log("product", product);
    setVisible(true);
    setProductSeeMore(product);
  };
  const closeModal = () => {
    setVisible(false);
  };
  return (
    <>
      <div>
        <DetailPopup
          open={visiable}
          onClose={closeModal}
          trendProducts={[]}
          productSeeMore={productSeeMore}
        />
        <section className="w-full">
          <div className="hd-page-head">
            <div className="hd-header-banner bg-[url('https://demo-kalles-4-1.myshopify.com/cdn/shop/files/shop-banner.jpg?v=1651829187&width=3024')] bg-no-repeat bg-cover bg-center">
              <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 lg:py-[50px] mb-0 py-[30px]">
                <div className="z-[100] relative hd-container text-white">
                  <h1 className="text-xl font-medium leading-5 mb-3">
                    Sản phẩm
                  </h1>
                  <p className=" text-sm flex justify-center items-center">
                    <span className="hover:text-[#F2F2F2]">Trang chủ</span>
                    <Less />
                    <span className="hover:text-[#F2F2F2]">Sản phẩm</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* search */}
        <div className="container">
          <header className="max-w-2xl mx-auto -mt-5 flex flex-col lg:-mt-7 lg:pb-10">
            <form
              className="relative w-full"
              method="post"
              onSubmit={handleSubmit}
            >
              <label htmlFor="search-input" className="text-neutral-500 ">
                <input
                  className="block w-full outline-0 border border-neutral-200 bg-white dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-full font-normal  pl-14 py-5 pr-5 md:pl-16 shadow-lg dark:border"
                  id="search-input"
                  placeholder="Nhập từ khóa của bạn"
                  type="search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button
                  className="ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-slate-900 hd-all-hoverblue-btn
        text-slate-50 absolute right-2.5 top-1/2 transform -translate-y-1/2  w-11 h-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
                <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M22 22L20 20"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
              </label>
              {suggestions.length > 0 && searchTerm && (
                <ul className="absolute z-10 mt-1 w-full bg-white text-black border border-neutral-200 rounded-md shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchTerm(suggestion); // Điền vào ô tìm kiếm
                        setSuggestions([]);
                      }}
                    >
                      {suggestion.toLowerCase()}
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </header>
        </div>

        {/* main */}
        <div className="container lg:space-x-4 lg:mt-10  xl:-mb-3 -mb-14 mt-10 lg:-mb-[9px]">
          <div
            className={`lg:flex flex sm:flex flex-1 space-x-4 lg:ml-[385px] xl:ml-[365px] `}
          >
            <div ref={growboxRef} className="flex items-center space-x-2 ">
              <button
                className="flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                border-neutral-300 text-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500
                "
                type="button"
                data-headlessui-state=""
                id="headlessui-popover-button-:rc:"
                onClick={toggleGrowboxDropdown}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2V5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M16 2V5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M7 13H15"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M7 17H12"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <span className="ml-2">Hãng</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  className="w-4 h-4 ml-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  ></path>
                </svg>
              </button>
              <div className="hd-show-brand font-medium px-2">
                {pro?.brands
                  ?.filter((brand) =>
                    appliedBrands.includes(brand.id.toString())
                  )
                  .map((brand) => (
                    <span key={brand.id} className="underline mr-2">
                      -{" "}
                      {brand.name.charAt(0).toUpperCase() +
                        brand.name.slice(1).toLowerCase()}
                    </span>
                  ))}
              </div>
              {growboxDropdownOpen && (
                <div
                  className="absolute z-40 max-w-sm px-4 mt-10 -left-4 sm:left-0 lg:left-[385px] xl:mt-[298px] xl:left-[494px] sm:px-0 lg:max-w-sm opacity-100 translate-y-0 w-[300px] sm:w-[350px]"
                  id="headlessui-popover-panel-:r26:"
                  tabIndex={-1}
                  data-headlessui-state="open"
                  data-open=""
                >
                  {/* brands  */}
                  <div className="overflow-hidden rounded-2xl shadow-xl bg-white border border-neutral-200">
                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                      {pro?.brands?.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center text-sm sm:text-base"
                        >
                          <input
                            id={`brand-${item.id}`}
                            className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                            type="checkbox"
                            name={item.name}
                            value={item.id.toString()}
                            checked={selectedBrand.includes(item.id.toString())}
                            onChange={() =>
                              handleCheckboxChange("brands", item.id.toString())
                            }
                          />
                          <label
                            htmlFor={`brand-${item.id}`}
                            className="pl-2.5 sm:pl-3 block text-slate-900 select-none"
                          >
                            {item.name.charAt(0).toUpperCase() +
                              item.name.slice(1).toLowerCase() || "No Brand"}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 bg-neutral-50 dark:border-t dark:border-neutral-200 flex items-center justify-between">
                      <button
                        onClick={handleClearFilters}
                        className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonThird text-neutral-700 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                      >
                        Xóa
                      </button>
                      <button
                        onClick={applyFilters}
                        className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 text-slate-50 shadow-xl hd-all-hoverblue-btn"
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div ref={toepfeRef} className="flex items-center space-x-3 ">
              <button
                className="flex items-center justify-center px-4 py-2 text-sm border rounded-full focus:outline-none select-none           
                border-neutral-300 text-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500
                "
                type="button"
                aria-expanded="false"
                data-headlessui-state=""
                id="headlessui-popover-button-:rl:"
                onClick={toggleToepfeDropdown}
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M11.5166 5.70834L14.0499 8.24168"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M11.5166 14.2917V5.70834"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M8.48327 14.2917L5.94995 11.7583"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M8.48315 5.70834V14.2917"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6025 1.66667 10.0001 1.66667C5.39771 1.66667 1.66675 5.39763 1.66675 10C1.66675 14.6024 5.39771 18.3333 10.0001 18.3333Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <span className="ml-2">Thứ tự</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  className="w-4 h-4 ml-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  ></path>
                </svg>
              </button>
              <div className="hd-show-sort font-medium underline">
                {selectedSortName}
              </div>
              {toepfeDropdownOpen && (
                <div
                  className="absolute z-40 max-w-sm px-4 mt-10 left-[120px] sm:left-[134px] lg:left-[520px] xl:mt-[430px] xl:left-[648px] sm:px-0 lg:max-w-sm opacity-100 translate-y-0 w-[300px] sm:w-[350px]"
                  id="headlessui-popover-panel-:r26:"
                  tabIndex={-1}
                  data-headlessui-state="open"
                  data-open=""
                >
                  {/* thứ tự */}
                  <div className="overflow-hidden rounded-2xl shadow-xl bg-white border border-neutral-200">
                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                      <div className="flex items-center text-sm sm:text-base ">
                        <input
                          id="Most-Popular"
                          className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                          type="radio"
                          value="Phổ biến nhất"
                          name="radioNameSort"
                          checked={selectedSort.trend}
                          onChange={() => {
                            setSelectedSort({
                              trend: true,
                              sortDirection: null,
                              sortPrice: null,
                              sortAlphaOrder: null,
                            });
                            setTemporarySortName("Phổ biến nhất");
                          }}
                        />
                        <label
                          htmlFor="Most-Popular"
                          className="pl-2.5 sm:pl-3 block text-slate-900 select-none"
                        >
                          Phổ biến nhất
                        </label>
                      </div>
                      <div className="flex items-center text-sm sm:text-base ">
                        <input
                          id="Newest"
                          className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                          type="radio"
                          value="desc"
                          name="radioNameSort"
                          checked={selectedSort.sortDirection === "desc"}
                          onChange={() => {
                            setSelectedSort({
                              trend: false,
                              sortDirection: "desc",
                              sortPrice: null,
                              sortAlphaOrder: null,
                            });
                            setTemporarySortName("Mới nhất");
                          }}
                        />
                        <label
                          htmlFor="Newest"
                          className="pl-2.5 sm:pl-3 block text-slate-900  select-none"
                        >
                          Mới nhất
                        </label>
                      </div>
                      <div className="flex items-center text-sm sm:text-base ">
                        <input
                          id="Price-low-hight"
                          className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                          type="radio"
                          value="asc"
                          name="radioNameSort"
                          checked={selectedSort.sortPrice === "asc"}
                          onChange={() => {
                            setSelectedSort({
                              trend: false,
                              sortDirection: null,
                              sortPrice: "asc",
                              sortAlphaOrder: null,
                            });
                            setTemporarySortName("Giá thấp - cao");
                          }}
                        />
                        <label
                          htmlFor="Price-low-hight"
                          className="pl-2.5 sm:pl-3 block text-slate-900  select-none"
                        >
                          Giá thấp - cao
                        </label>
                      </div>
                      <div className="flex items-center text-sm sm:text-base ">
                        <input
                          id="Price-hight-low"
                          className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                          type="radio"
                          value="desc"
                          name="radioNameSort"
                          checked={selectedSort.sortPrice === "desc"}
                          onChange={() => {
                            setSelectedSort({
                              trend: false,
                              sortDirection: null,
                              sortPrice: "desc",
                              sortAlphaOrder: null,
                            });
                            setTemporarySortName("Giá cao - thấp");
                          }}
                        />
                        <label
                          htmlFor="Price-hight-low"
                          className="pl-2.5 sm:pl-3 block text-slate-900  select-none"
                        >
                          Giá cao - thấp
                        </label>
                      </div>
                      <div className="flex items-center text-sm sm:text-base ">
                        <input
                          id="Price-hight-low"
                          className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                          type="radio"
                          value="asc"
                          name="radioNameSort"
                          checked={selectedSort.sortAlphaOrder === "asc"}
                          onChange={() => {
                            setSelectedSort({
                              trend: false,
                              sortDirection: null,
                              sortPrice: null,
                              sortAlphaOrder: "asc",
                            });
                            setTemporarySortName("Từ A-Z");
                          }}
                        />
                        <label
                          htmlFor="Price-hight-low"
                          className="pl-2.5 sm:pl-3 block text-slate-900  select-none"
                        >
                          Từ A-Z
                        </label>
                      </div>
                      <div className="flex items-center text-sm sm:text-base ">
                        <input
                          id="Price-hight-low"
                          className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                          type="radio"
                          value="desc"
                          name="radioNameSort"
                          checked={selectedSort.sortAlphaOrder === "desc"}
                          onChange={() => {
                            setSelectedSort({
                              trend: false,
                              sortDirection: null,
                              sortPrice: null,
                              sortAlphaOrder: "desc",
                            });
                            setTemporarySortName("Từ Z-A");
                          }}
                        />
                        <label
                          htmlFor="Price-hight-low"
                          className="pl-2.5 sm:pl-3 block text-slate-900  select-none"
                        >
                          Từ Z-A
                        </label>
                      </div>
                    </div>
                    <div className="p-5 bg-neutral-50 dark:border-t dark:border-neutral-200 flex items-center justify-between">
                      <button
                        onClick={handleClearFilters}
                        className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonThird text-neutral-700 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                      >
                        Xóa
                      </button>
                      <button
                        onClick={applyFilters}
                        className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 text-slate-50 shadow-xl hd-all-hoverblue-btn"
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container py-12 flex flex-col lg:flex-row">
          <div className="lg:w-1/3 xl:w-1/4 pr-4 lg:-mt-1 mt-10">
            <div className="divide-y divide-slate-200">
              {/* categories */}
              <div className="relative flex flex-col pb-8 space-y-4">
                <h3 className="font-semibold mb-2.5 ">Danh mục</h3>
                {pro?.categories?.map((item) => (
                  <div className="" key={item.id}>
                    <div className="flex text-sm sm:text-base ">
                      <input
                        id={`cat-${item.id}`}
                        className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                        type="checkbox"
                        name={item.name}
                        value={item.id}
                        checked={selectedCategories.includes(
                          item.id.toString()
                        )}
                        onChange={() =>
                          handleCheckboxChange("categories", item.id.toString())
                        }
                      />
                      <label
                        htmlFor={`cat-${item.id}`}
                        className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                      >
                        <span className="text-slate-900 text-sm font-normal">
                          {item.name || "No Category"}
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              {Object.entries(pro?.attributes || {}).map(([key, values]) => (
                <div
                  className="relative flex flex-col py-8 space-y-4"
                  key={key}
                >
                  <h3 className="font-semibold mb-2.5">{key}</h3>
                  {values?.map((item) => (
                    <div key={item.id}>
                      <div className="flex text-sm sm:text-base">
                        <input
                          id={`${key}-${item.id}`}
                          className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                          type="checkbox"
                          name={item.name}
                          value={
                            item.value.charAt(0).toUpperCase() +
                            item.value.slice(1).toLowerCase()
                          }
                          checked={selectedAttributes[key]?.includes(
                            item.value.charAt(0).toUpperCase() +
                              item.value.slice(1).toLowerCase()
                          )}
                          onChange={() =>
                            handleCheckboxChange(
                              key,
                              item.value.charAt(0).toUpperCase() +
                                item.value.slice(1).toLowerCase()
                            )
                          }
                        />
                        <label
                          htmlFor={`${key}-${item.id}`}
                          className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                        >
                          <span className="text-slate-900 text-sm font-normal">
                            {colorTranslations[
                              item.value.charAt(0).toUpperCase() +
                                item.value.slice(1).toLowerCase()
                            ] ||
                              item.value.charAt(0).toUpperCase() +
                                item.value.slice(1).toLowerCase() ||
                              "No Value"}
                          </span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* prices */}
              <div className="relative flex flex-col py-8 space-y-5 pr-3">
                <div className="flex space-x-3">
                  <div>
                    <label
                      htmlFor="minPrice"
                      className="block text-sm font-medium text-neutral-700"
                    >
                      Giá nhỏ nhất
                    </label>
                    <div className="mt-1 relative rounded-md">
                      <span className="absolute inset-y-0 right-[15px] flex items-center pointer-events-none text-neutral-400 sm:text-sm">
                        đ
                      </span>
                      <input
                        id="minPrice"
                        className="block w-[115px] pl-3 py-[6px] text-xs lg:text-sm border border-neutral-300 rounded-full bg-transparent"
                        type="number"
                        value={minPrice}
                        min="0"
                        placeholder="0"
                        name="minPrice"
                        onChange={(e) =>
                          setMinPrice(
                            Math.max(0, Number(e.target.value)).toString()
                          )
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="maxPrice"
                      className="block text-sm font-medium text-neutral-700"
                    >
                      Giá lớn nhất
                    </label>
                    <div className="mt-1 relative rounded-md">
                      <span className="absolute inset-y-0 right-[15px] flex items-center pointer-events-none text-neutral-400 sm:text-sm">
                        đ
                      </span>
                      <input
                        id="maxPrice"
                        className="block w-[115px] pl-3 py-[6px] text-xs lg:text-sm border border-neutral-300 rounded-full bg-transparent"
                        type="number"
                        value={maxPrice}
                        min="0"
                        placeholder="100.000.000"
                        name="maxPrice"
                        onChange={(e) =>
                          setMaxPrice(
                            Math.max(0, Number(e.target.value)).toString()
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-1">
                    <button className="" onClick={applyFilters}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        className=""
                      >
                        <path
                          d="M21 6H19M21 12H16M21 18H16M7 20V13.5612C7 13.3532 7 13.2492 6.97958 13.1497C6.96147 13.0615 6.93151 12.9761 6.89052 12.8958C6.84431 12.8054 6.77934 12.7242 6.64939 12.5617L3.35061 8.43826C3.22066 8.27583 3.15569 8.19461 3.10948 8.10417C3.06849 8.02393 3.03853 7.93852 3.02042 7.85026C3 7.75078 3 7.64677 3 7.43875V5.6C3 5.03995 3 4.75992 3.10899 4.54601C3.20487 4.35785 3.35785 4.20487 3.54601 4.10899C3.75992 4 4.03995 4 4.6 4H13.4C13.9601 4 14.2401 4 14.454 4.10899C14.6422 4.20487 14.7951 4.35785 14.891 4.54601C15 4.75992 15 5.03995 15 5.6V7.43875C15 7.64677 15 7.75078 14.9796 7.85026C14.9615 7.93852 14.9315 8.02393 14.8905 8.10417C14.8443 8.19461 14.7793 8.27583 14.6494 8.43826L11.3506 12.5617C11.2207 12.7242 11.1557 12.8054 11.1095 12.8958C11.0685 12.9761 11.0385 13.0615 11.0204 13.1497C11 13.2492 11 13.3532 11 13.5612V17L7 20Z"
                          stroke="#808080"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <button onClick={handleClearFilters}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#A0A0A0"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* product-sale  */}
              <div className="py-8 pr-2">
                <div className="MySwitch flex justify-between items-center space-x-2 ">
                  <div>
                    <label
                      className="nc-Label text-base font-medium text-neutral-900"
                      data-nc-id="Label"
                    >
                      Đang giảm giá!
                    </label>
                    <p className="text-neutral-500 dark:text-neutral-400  text-xs">
                      Sản phảm hiện đang được bán
                    </p>
                  </div>
                  <label className="hd-switch relative">
                    <input
                      className="relative w-[65px] h-[30px] bg-[#c6c6c6] rounded-[20px] checked:bg-[#00BADB] before:content-[''] before:absolute before:top-[2.5px] before:left-[2.5px] before:scale-[1.1] before:w-[25px] before:h-[25px] before:bg-white before:rounded-[20px] before:transition-all before:duration-500 checked:before:left-[38px] hd-ok"
                      type="checkbox"
                      checked={isSale}
                      onChange={() => handleCheckboxChange("sale", null)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l border-gray-200"></div>

          <div className="">
            {/* products */}
            {noProductsMessage && (
              <div className="flex bg-gray-50 h-full w-[1000px] justify-center pt-32">
                {noProductsMessage}
              </div>
            )}
            <div className="flex-1 ml-8">
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:mx-7 sm:gap-x-10 xl:gap-8 gap-y-8 ">
                {/* {isFetching ? (
                  Array(6).fill(0).map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse flex flex-col space-y-4 bg-gray-200 w-[290px] rounded-lg p-4"
                    >
                      <div className="bg-gray-300 h-[250px] w-full lg:h-[330px] lg:w-[260px] sm:h-[345px]"></div>
                      <div className="bg-gray-300 h-6 w-3/4"></div>
                      <div className="bg-gray-300 h-6 w-1/2"></div>
                    </div>
                  ))
                ) : ( */}
                {pro && pro.products && pro?.products?.length > 0 ? (
                  currentProducts?.map(
                    ({ product, getUniqueAttributes, discountPercentage }) => {
                      const inWishlist = isInWishlist(product.id);

                      return (
                        <>
                          <div
                            className="nc-ProductCard relative flex flex-col bg-transparent"
                            key={product.id}
                          >
                            <div className="lg:mb-[25px] mb-[20px]">
                              <div className="cursor-pointer lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
                                <Link
                                  to={`/products/${product?.slug}.html`}
                                  className="absolute inset-0"
                                >
                                  <img
                                    className="group-hover:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover:opacity-0 object-cover"
                                    src={product.img_thumbnail}
                                    alt="Product"
                                  />
                                  <img
                                    className="group-hover:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover:opacity-100 object-cover"
                                    src={product.img_thumbnail}
                                    alt="Product"
                                  />
                                </Link>

                                <div className="image-overlay"></div>
                                {/* <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-10"></div> */}
                                <div>
                                  <button
                                    className="absolute left-5 top-5 cursor-pointer"
                                    onClick={() => handleAddToWishlist(product)}
                                  >
                                    {inWishlist ? <HeartRed /> : <HeartWhite />}
                                  </button>
                                </div>
                                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                                  <div className="group/btn relative">
                                    {product.variants.length > 0 ? (
                                      <button
                                        className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]"
                                        onClick={() =>
                                          handleOpenSeeMore(product)
                                        }
                                      >
                                        <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                                          Mua ngay
                                        </p>
                                        <Eye />
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          handleOpenSeeMore(product)
                                        }
                                        className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]"
                                      >
                                        <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                                          Mua ngay
                                        </p>
                                        <Eye />
                                      </button>
                                    )}
                                  </div>

                                  <Link to="" className="group/btn relative">
                                    <button
                                      className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]"
                                      onClick={() => {
                                        modalRef.current?.showModal(),
                                          setSlugProduct(product?.slug);
                                        setIdProduct(product?.id);
                                      }}
                                    >
                                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                                        Thêm vào giỏ hàng
                                      </p>
                                      <CartDetail />
                                    </button>
                                  </Link>
                                </div>
                                <div className="flex justify-center">
                                  <div
                                    className="absolute bottom-2 text-center text-white
                              -translate-y-7 transform
                                transition-all duration-500 ease-in-out
                                group-hover:translate-y-0
                                opacity-0
                                group-hover:opacity-100
                              "
                                  >
                                    <ul className="flex">
                                      {getUniqueAttributes &&
                                        Object.entries(getUniqueAttributes)
                                          .filter(([key, value]) => {
                                            // Hàm kiểm tra xem giá trị có phải là kích thước hay không
                                            const isSizeValue = (v: any) => {
                                              return (
                                                /^[smlxSMLX]{1,3}$/.test(v) || // Kích thước ký tự s, m, l, x (cả chữ thường và hoa)
                                                /^[0-9]+(\.\d+)?\s?(cm|inch|mm|kg)?$/i.test(
                                                  v
                                                ) || // Số có đơn vị (i: không phân biệt hoa/thường)
                                                /^[0-9]+$/.test(v) || // Số nguyên
                                                /^[0-9]+[smlxSMLX]+$/.test(v) // Số trước ký tự size (vd: 2XL, 3X, 4L)
                                              );
                                            };

                                            if (Array.isArray(value)) {
                                              return value.every(isSizeValue); // Nếu là mảng, kiểm tra từng phần tử
                                            }
                                            if (
                                              typeof value === "object" &&
                                              value !== null
                                            ) {
                                              return Object.values(value).every(
                                                isSizeValue
                                              ); // Nếu là object, kiểm tra từng giá trị
                                            }
                                            return isSizeValue(value); // Nếu là giá trị đơn lẻ
                                          })
                                          .map(([key, value]) => (
                                            <li key={key}>
                                              {Array.isArray(value)
                                                ? value
                                                    .map((v) =>
                                                      String(v).toUpperCase()
                                                    )
                                                    .join(", ") // Nếu là mảng
                                                : typeof value === "object" &&
                                                    value !== null
                                                  ? Object.values(value)
                                                      .map((v) =>
                                                        String(v).toUpperCase()
                                                      )
                                                      .join(", ") // Nếu là object
                                                  : String(
                                                      value
                                                    ).toUpperCase()}{" "}
                                              {/* Nếu là giá trị đơn lẻ */}
                                            </li>
                                          ))}
                                    </ul>
                                  </div>
                                  {discountPercentage > 0 && (
                                    <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[45px] lg:w-[45px] h-[40px] w-[40px] lg:text-sm text-[12px] rounded-full bg-red-400">
                                      -{discountPercentage}%
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div>
                                <Link to={`/products/${product?.slug}.html`}>
                                  <p className="text-base font-medium text-black mb-1 cursor-pointer hd-all-hover-bluelight">
                                    {product.name.charAt(0).toUpperCase() +
                                      product.name.slice(1).toLowerCase()}
                                  </p>
                                </Link>
                                {(product?.price_regular ||
                                  product?.variants?.length) && (
                                  <div>
                                    {(() => {
                                      const variants = product?.variants || [];
                                      // Tính toán giá bán và giá gốc từ các biến thể
                                      const minPriceSale = Math.min(
                                        ...variants
                                          .map(
                                            (variant: any) => variant.price_sale
                                          )
                                          .filter((price: any) => price >= 0)
                                      );
                                      const minPriceRegular = Math.min(
                                        ...variants
                                          .map(
                                            (variant: any) =>
                                              variant.price_regular
                                          )
                                          .filter((price: any) => price >= 0)
                                      );
                                      const maxPriceRegular = Math.max(
                                        ...variants
                                          .map(
                                            (variant: any) =>
                                              variant.price_regular
                                          )
                                          .filter((price: any) => price > 0)
                                      );
                                      const productPriceSale =
                                        product?.price_sale;
                                      const productPriceRegular =
                                        product?.price_regular;

                                      const pricesSaleVar = variants.map(
                                        (variant: any) => variant.price_sale
                                      );
                                      const pricesRegularVar = variants.map(
                                        (variant: any) => variant.price_regular
                                      );
                                      const allSaleEqual = pricesSaleVar.every(
                                        (price: any) =>
                                          price === pricesSaleVar[0]
                                      );
                                      const allRegularEqual =
                                        pricesRegularVar.every(
                                          (price: any) =>
                                            price === pricesRegularVar[0]
                                        );

                                      if (minPriceSale > 0) {
                                        // Nếu có giá sale
                                        if (
                                          (productPriceSale &&
                                            productPriceSale <
                                              productPriceRegular) ||
                                          productPriceSale === 0
                                        ) {
                                          return (
                                            <>
                                              <del className="mr-1">
                                                {new Intl.NumberFormat(
                                                  "vi-VN"
                                                ).format(productPriceRegular)}
                                                VNĐ
                                              </del>
                                              <span className="text-[red]">
                                                {new Intl.NumberFormat(
                                                  "vi-VN"
                                                ).format(productPriceSale)}
                                                VNĐ
                                              </span>
                                            </>
                                          );
                                        } else if (
                                          productPriceSale &&
                                          productPriceSale ===
                                            productPriceRegular
                                        ) {
                                          return (
                                            <span>
                                              {new Intl.NumberFormat(
                                                "vi-VN"
                                              ).format(productPriceRegular)}
                                              VNĐ
                                            </span>
                                          );
                                        } else {
                                          if (allSaleEqual && allRegularEqual) {
                                            // Nếu tất cả giá sale và giá regular giống nhau
                                            return (
                                              <>
                                                <del className="mr-1">
                                                  {new Intl.NumberFormat(
                                                    "vi-VN"
                                                  ).format(
                                                    pricesRegularVar[0]
                                                  )}{" "}
                                                  VNĐ
                                                </del>
                                                <span className="text-[red]">
                                                  {new Intl.NumberFormat(
                                                    "vi-VN"
                                                  ).format(
                                                    pricesSaleVar[0]
                                                  )}{" "}
                                                  VNĐ
                                                </span>
                                              </>
                                            );
                                          } else {
                                            return (
                                              <span>
                                                {new Intl.NumberFormat(
                                                  "vi-VN"
                                                ).format(minPriceSale)}
                                                VNĐ -{" "}
                                                {new Intl.NumberFormat(
                                                  "vi-VN"
                                                ).format(maxPriceRegular)}
                                                VNĐ
                                              </span>
                                            );
                                          }
                                        }
                                      } else {
                                        return (
                                          <span>
                                            {new Intl.NumberFormat(
                                              "vi-VN"
                                            ).format(minPriceRegular)}
                                            VNĐ -{" "}
                                            {new Intl.NumberFormat(
                                              "vi-VN"
                                            ).format(maxPriceRegular)}
                                            VNĐ
                                          </span>
                                        );
                                      }
                                    })()}
                                  </div>
                                )}
                              </div>

                              <div className="t4s-product-colors flex">
                                {getUniqueAttributes &&
                                  Object.entries(getUniqueAttributes)
                                    .filter(([key, value]) => {
                                      // Hàm kiểm tra xem giá trị có phải là màu sắc không
                                      const isColorValue = (v: any) => {
                                        // Kiểm tra tên màu hợp lệ bằng cách tạo một phần tử DOM
                                        const isValidColorName = (
                                          color: string
                                        ) => {
                                          const s = new Option().style;
                                          s.color = color;
                                          return s.color !== ""; // Nếu gán thành công và không rỗng thì là màu hợp lệ
                                        };

                                        // Kiểm tra mã hex
                                        const isHexColor = (color: string) =>
                                          /^#[0-9A-F]{3}$|^#[0-9A-F]{6}$/i.test(
                                            color
                                          );

                                        // Kiểm tra mã RGB/RGBA
                                        const isRgbColor = (color: string) =>
                                          /^rgba?\(\s?(\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})(,\s?([01](\.\d+)?))?\)$/.test(
                                            color
                                          );

                                        // Kiểm tra mã HSL
                                        const isHslColor = (color: string) =>
                                          /^hsla?\(\s?(\d{1,3}),\s?(\d{1,3})%,\s?(\d{1,3})%(,\s?([01](\.\d+)?))?\)$/.test(
                                            color
                                          );

                                        return (
                                          isValidColorName(v) ||
                                          isHexColor(v) ||
                                          isRgbColor(v) ||
                                          isHslColor(v)
                                        );
                                      };

                                      return Array.isArray(value)
                                        ? value.every(isColorValue)
                                        : typeof value === "object" &&
                                            value !== null
                                          ? Object.values(value).every(
                                              isColorValue
                                            )
                                          : isColorValue(value);
                                    })

                                    .map(([key, value]) => {
                                      // console.log(value);
                                      const colors = Array.isArray(value)
                                        ? value
                                        : typeof value === "object" &&
                                            value !== null
                                          ? Object.values(value)
                                          : [value];

                                      return (
                                        <div key={key} className="mt-1 flex">
                                          {colors.map((color, index) => (
                                            <span
                                              key={index}
                                              className="t4s-pr-color__item flex flex-col items-center cursor-pointer mr-1"
                                            >
                                              <span
                                                style={{
                                                  backgroundColor:
                                                    color.toLowerCase(),
                                                }}
                                                className="t4s-pr-color__value border border-gray-400 w-5 h-5 hover:border-black hover:border-2 rounded-full p-[5px]"
                                              ></span>
                                            </span>
                                          ))}
                                        </div>
                                      );
                                    })}
                              </div>
                            </div>
                          </div>
                          {/* </div> */}
                          <CartPopup
                            slugProduct={slugProduct}
                            idProduct={idProduct}
                            setIdProduct={setIdProduct}
                            ref={modalRef}
                            setSlugProduct={setSlugProduct}
                          />
                        </>
                      );
                    }
                  )
                ) : (
                  <div></div>
                )}
              </div>
              {/* phân trang  */}
              {totalProducts > productsPerPage && (
                <div className="pagination flex justify-center mt-6">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 bg-gray-100 rounded"
                  >
                    Quay lại
                  </button>
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 mx-1 ${
                        currentPage === pageNumber
                          ? "text-black"
                          : "text-gray-300"
                      } rounded`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 bg-gray-100 rounded"
                  >
                    Chuyển tiếp
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
