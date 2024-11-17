import React from "react";
import { Pie } from "@ant-design/charts";
import { Tag, Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios";
import Loading from "@/common/Loading/Loading";
const { Option } = Select;

const DonutChartWithLegend = () => {
  const { data: dataProduct, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      let res = await instance.get(`/getrevenuestatistics`);
      console.log("res", res);
      return res?.data;
    },
  });

  if (isLoading) return <Loading />;

  // Dữ liệu lấy từ API (dataProduct)
  const data = dataProduct?.map((item:any) => ({
    type: item.product_name,  // Tên sản phẩm
    value: item.revenue,      // Doanh thu của sản phẩm
  })) || [];

  // Danh sách màu sắc (có thể tùy chỉnh)
  const colors = [
    "#3FC1C9", "#F9C74F", "#F94144", "#90BE6D", "#F3722C", "#B8A9C9", "#8D99AE"
  ];

  // Gán màu sắc cho từng phần tử
  const dataWithColors = data.map((item:any, index:any) => ({
    ...item,
    color: colors[index % colors.length],  
  }));

  // Cấu hình biểu đồ Pie
  const config = {
    height: 350,
    appendPadding: 0,
    data: dataWithColors,
    angleField: "value",  // Trường chứa giá trị doanh thu
    colorField: "type",   // Trường chứa tên sản phẩm
    radius: 0.8,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "0%",
      content: "{percentage}",
      style: {
        fontSize: 12,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };

  return (
    <div className="py-6 px-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Doanh thu của sản phẩm
        </h3>
        <Select
          placeholder="Report"
          style={{ width: 120 }}
          className="border-none"
          allowClear
        >
          <Option value={1}>Download Report</Option>
          <Option value={10}>Export</Option>
          <Option value={30}>Import</Option>
        </Select>
      </div>
      <div className="mb-6">
        <Pie {...config} />
      </div>
    </div>
  );
};

export default DonutChartWithLegend;
