import React, { useEffect, useState } from "react";
import { Bar, Column } from "@ant-design/charts";
import { useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios";
import Loading from "@/common/Loading/Loading";
import type { DatePickerProps, GetProps } from 'antd';
import { DatePicker, Select, Space } from 'antd';
const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
const { Option } = Select;
const DonutChartWithLegend = () => {
  const [data, setData] = useState<any>([])
  const [filter, setFilter] = useState<any>({
    filter_end_date: null,
    filter_start_date: null,
    filter_type: "day",
    filter_value: new Date().toISOString().split('T')[0],
  })
  const getData = async () => {
    let res = await instance.post(`/getrevenuestatistics`, filter);
    if (res) {
      setData(res.data)
    }
  }
  const [inputRange, setInputRange] = useState(false);
  const hanldeChangeType = (type: string) => {
    switch (type) {
      case "day":
        setFilter((prev: any) => ({ ...prev, filter_type: type }))
        break;
      case "week":
        setFilter((prev: any) => ({ ...prev, filter_type: type }))
        break;
      case "month":
        setFilter((prev: any) => ({ ...prev, filter_type: type }))
        break;
      case "year":
        setFilter((prev: any) => ({ ...prev, filter_type: type }))
        break;
      case "range":
        setInputRange((prev) => !prev)
        setFilter((prev: any) => ({ ...prev, filter_type: type }))
      default:
        break;
    }
  }
  console.log("inputRange", inputRange)
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    const formattedDate = date ? date.format('YYYY-MM-DD') : '';
    setFilter((prev: any) => ({
      ...prev,
      filter_value: formattedDate
    }))
  };
  const filterRange = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('filterRange: ', value);
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
        <div className="flex flex-col">
          <Select
            placeholder="Chọn kiểu tìm kiếm"
            style={{ width: 280 }}
            className="border-none "
            onChange={hanldeChangeType}
            allowClear
          >
            <Option value="day">Tìm theo ngày</Option>
            <Option value="week">Tìm theo tuần</Option>
            <Option value="month">Tìm theo tháng</Option>
            <Option value="year">Tìm theo năm</Option>
            <Option value="range">Tìm theo khoảng</Option>
          </Select>
          {
            !inputRange && <DatePicker
              onChange={onChange}
              style={{ width: 280 }}
              className="border border-gray-300 rounded-lg p-2 mt-4  text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Chọn"
              picker={filter.filter_type === 'day' ? 'date' : filter.filter_type}
            />
          }
          {
            inputRange && <RangePicker className="mt-4"
              onChange={(value, dateString) => {
                setFilter((prev: any) => ({
                  ...prev,
                  filter_type: "range",
                  filter_start_date: dateString[0],
                  filter_end_date: dateString[1],
                }))
              }}
              onOk={filterRange}
            />
          }
        </div>
      </div>
      <div className="">
        {
          value.length > 0 ? <Column {...config} /> : "Không có dữ liệu"
        }
      </div>
    </div>
  );
};

export default DonutChartWithLegend;
