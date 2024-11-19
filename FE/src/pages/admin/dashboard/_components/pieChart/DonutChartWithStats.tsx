import React, { useEffect, useState } from "react";
import { Bar, Column } from "@ant-design/charts";
import { useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios";
import Loading from "@/common/Loading/Loading";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
const DonutChartWithLegend = () => {
  const [data, setData] = useState<any>([])
  const [filter, setFilter] = useState<any>({
    filter_end_date: null,
    filter_start_date: null,
    filter_type: "day",
    filter_value: null,
  })
  const getData = async () => {
    let res = await instance.post(`/getrevenuestatistics`, filter);
    if (res) {
      setData(res.data)
    }
  }
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    const formattedDate = date ? date.format('YYYY-MM-DD') : '';
    setFilter((prev: any) => ({
      ...prev,
      filter_value: formattedDate
    }))
  };
  const value: any[] = data?.data?.map((item: any) => ({
    type: item.product_name,
    value: item.revenue,
  })) || [];
  const colors = [
    "#3FC1C9", "#F9C74F", "#F94144", "#90BE6D", "#F3722C", "#B8A9C9", "#8D99AE"
  ];
  const config = {
    height: 350,
    data: value || [],
    xField: 'type',
    yField: 'value',
    colorField: 'type',
    color: colors,
    label: {
      position: 'middle',
      style: {
        fill: '#fff',
        fontSize: 16,
      },
    },
    interactions: [{ type: 'element-active' }],
  };
  
  useEffect(() => {
    getData();
  }, [filter])

  return (
    <div className="py-6 px-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Doanh thu của sản phẩm
        </h3>
        {/* <Select
          placeholder="Report"
          style={{ width: 280 }}
          className="border-none "
          allowClear
        >
          <Option value={1}>Download Report</Option>
          <Option value={10}>Export</Option>
          <Option value={30}>Import</Option>
        </Select> */}
       <DatePicker
        onChange={onChange}
        className="border border-gray-300 rounded-lg p-2 w-[40%] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Chọn ngày"
        // picker="month"
      />
      </div>
      <div className="">
        {
        value.length > 0 ?  <Column {...config} /> : "Không có dữ liệu"
        }
      </div>
    </div>
  );
};

export default DonutChartWithLegend;
