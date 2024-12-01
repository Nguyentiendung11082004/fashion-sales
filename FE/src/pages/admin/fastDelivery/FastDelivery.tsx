// import { Button, Table } from "antd";
// import React from "react";
// import { Link } from "react-router-dom";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import Loading from "@/common/Loading/Loading";
// import { Itags } from "@/common/types/tags";
// import { deleteTag, getTags } from "@/services/api/admin/tags.api";
// import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Button, Modal, Pagination, Table } from "antd";
// import { ColumnType } from "antd/es/table";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const FastDelivery = () => {
//   const queryClient = useQueryClient();
//   const [current, setCurrentTagId] = useState<number | null>(null);
//   const [visible, setVisible] = useState(false);
//   const [hasError, setHasError] = useState(false);
//   const initialPage = queryClient.getQueryData(["currentTagsPage"]) || 1;
//   const [currentTagsPage, setCurrentTagsPage] = useState(Number(initialPage));
//   const [pageSize] = useState(5);
//   const navigate = useNavigate();
//   return (
//     <>
//       <div className="p-6 min-h-screen">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
//             Giao hàng nhanh
//           </h1>
//         </div>
//         <div>
//           {isFetching ? (
//             <Loading />
//           ) : (
//             <>
//               <Table
//                 className="custom-table"
//                 dataSource={dataSource.slice(
//                   (currentTagsPage - 1) * pageSize,
//                   currentTagsPage * pageSize
//                 )}
//                 columns={columns}
//                 pagination={false}
//               />
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default FastDelivery;
