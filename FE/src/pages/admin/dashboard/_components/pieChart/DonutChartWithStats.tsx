import instance from "@/configs/axios";
import { Column } from "@ant-design/charts";
import type { GetProps } from 'antd';
import { DatePicker, Select } from 'antd';
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../Dashboard";
const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
const { Option } = Select;
type Props = {
  dataDoanhThu: (data: any) => void;
}
const DonutChartWithLegend = ({ dataDoanhThu }: Props) => {
  const { filter, setFilter } = useContext(DashboardContext)
  const [data, setData] = useState<any>([])
  const getData = async () => {
    let res = await instance.post(`/getrevenuestatistics`, filter);
    if (res) {
      setData(res.data)
      dataDoanhThu(res?.data?.total_revenue)
    }
  }
  const value: any[] = data?.data?.map((item: any) => ({
    type: item.product_name,
    value: item.revenue,
  })) || [];
  console.log("value", value)
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
    <div className="py-6 px-8 bg-white rounded-lg shadow-md mt-2" >
      <div className="flex justify-between items-center mb-6" style={{ height: "100%" }}>
        <h3 className="text-xl font-semibold text-gray-800">
          Doanh thu của sản phẩm
        </h3>
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
