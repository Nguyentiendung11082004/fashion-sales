// import { convertColorNameToClass } from "@/common/colors/colorUtils";
// import CartDetail from "@/components/icons/detail/CartDetail";
// import Eye from "@/components/icons/detail/Eye";
// import HeartWhite from "@/components/icons/detail/HeartWhite";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const Wishlist = () => {
//   const [wishlistProducts, setWishlistProducts] = useState([]);

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/api/v1/wishlist"
//         );
//         setWishlistProducts(response.data);
//         console.log(response.data);
        
//       } catch (error) {
//         console.error("Có lỗi xảy ra khi lấy danh sách yêu thích:", error);
//       }
//     };

//     fetchWishlist();
//   }, []);
  return ( <>
  </>)
//     <div>
//       <div className="hd-PageAbout overflow-hidden relative">
//         <div className="hd-page-head">
//           <div className="hd-header-banner bg-[url('./src/assets/images/shopping-cart-head.webp')] bg-no-repeat bg-cover bg-center">
//             <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 lg:py-[50px] mb-0 py-[30px]">
//               <div className="z-[100] relative hd-container text-white">
//                 <h1 className="text-xl font-medium leading-5 mb-3">
//                   Yêu thích
//                 </h1>
//                 <p className="text-sm">Sản phẩm yêu thích của bạn</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <div className="grid grid-cols-2 gap-4 lg:ml-2.5 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 xl:gap-8 md:grid-cols-3 md:gap-6 mx-auto">
//             {wishlistProducts.map((product) => (
//               <div key={product.id} className="product-item">
//                 <div className="lg:mb-[25px] mb-[20px]">
//                   <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
//                     <img
//                       className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0 object-cover "
//                       src={product.img_thumbnail}
//                     />
//                     <img
//                       className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100 object-cover"
//                       src={product.img_thumbnail}
//                     />
//                     <div>
//                       <Link to="" className="absolute left-5 top-5">
//                         <HeartWhite />
//                       </Link>
//                     </div>
//                     <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
//                       <Link to="" className="group/btn relative m-auto">
//                         <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
//                           <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
//                             Xem thêm
//                           </p>
//                           <Eye />
//                         </button>
//                       </Link>
//                       <Link to="" className="group/btn relative">
//                         <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
//                           <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
//                             Thêm vào giỏ hàng
//                           </p>
//                           <CartDetail />
//                         </button>
//                       </Link>
//                     </div>
//                     <div
//                       className="absolute text-white
//    -translate-y-7 transform 
//     transition-all duration-500 ease-in-out 
//     group-hover:translate-y-0
//     opacity-0
//     group-hover:opacity-100
//   "
//                     >
//                       <ul className="flex">
//                         {product.unique_attributes.size && (
//                           <li>
//                             {Object.values(product.unique_attributes.size).join(
//                               ", "
//                             )}
//                           </li>
//                         )}
//                       </ul>
//                     </div>

//                     {product.price_regular &&
//                       product.price_sale > 0 &&
//                       product.price_sale < product.price_regular && (
//                         <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
//                           -
//                           {Math.round(
//                             ((product.price_regular - product.price_sale) /
//                               product.price_regular) *
//                               100
//                           )}
//                           %
//                         </div>
//                       )}
//                   </div>
//                   <div>
//                     <p className="text-sm text-black mb-1">{product.name}</p>
//                     <del className="mr-1">{product.price_regular}₫</del>
//                     <span className="text-[red]">{product.price_sale}₫</span>
//                   </div>

//                   <div className="t4s-product-colors flex">
//                     {product.unique_attributes.color &&
//                       Object.values(product.unique_attributes.color)
//                         .filter((color) => typeof color === "string")
//                         .map((color, index) => (
//                           <div key={index} className="mr-2 mt-1">
//                             <span className="t4s-pr-color__item flex flex-col items-center cursor-pointer">
//                               <span className="t4s-pr-color__value border border-gray-400 w-5 h-5 hover:border-black hover:border-2 rounded-full">
//                                 <div
//                                   className={`w-[17px] h-[17px] rounded-full mt-[1px] ml-[0.5px] lg:mt-[0.5px] lg:hover:mt-[-0.5px] lg:hover:ml-[-0.25px] ${convertColorNameToClass(color)}`}
//                                 ></div>
//                               </span>
//                             </span>
//                           </div>
//                         ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div> */}
//         {wishlistProducts.length === 0 ? (
//           <p>Không có sản phẩm nào trong danh sách yêu thích.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {wishlistProducts.map((product) => (
//               <div key={product.wishlist_id} className="product-item">
//                 <div className="lg:mb-[25px] mb-[20px]">
//                   <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
//                     <img
//                       className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0 object-cover"
//                       src={product.product.img_thumbnail}
//                       alt={product.product.name}
//                     />
//                     <div>
//                       <Link
//                         to={`/product/${product.product.id}`}
//                         className="absolute left-5 top-5"
//                       >
//                         {/* Thay đổi link cho phù hợp với sản phẩm */}
//                         {/* Icon trái tim ở đây */}
//                       </Link>
//                     </div>
//                     {/* Hiển thị các thuộc tính khác, giá cả, và nút hành động như thêm vào giỏ hàng */}
//                     <div className="absolute text-white -translate-y-7 transform transition-all duration-500 ease-in-out group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
//                       <ul className="flex">
//                         {product.getUniqueAttributes.size && (
//                           <li>
//                             {Object.values(
//                               product.getUniqueAttributes.size
//                             ).join(", ")}
//                           </li>
//                         )}
//                       </ul>
//                     </div>

//                     {product.product.price_regular &&
//                       product.product.price_sale > 0 &&
//                       product.product.price_sale <
//                         product.product.price_regular && (
//                         <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
//                           -
//                           {Math.round(
//                             ((product.product.price_regular -
//                               product.product.price_sale) /
//                               product.product.price_regular) *
//                               100
//                           )}
//                           %
//                         </div>
//                       )}
//                   </div>
//                   <div>
//                     <p className="text-sm text-black mb-1">
//                       {product.product.name}
//                     </p>
//                     <del className="mr-1">{product.product.price_regular}₫</del>
//                     <span className="text-[red]">
//                       {product.product.price_sale}₫
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
};

export default Wishlist;
