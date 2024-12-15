import React, { useContext, useEffect, useState } from "react";
import { Column } from "@ant-design/charts";
import instance from "@/configs/axios";
import { DashboardContext } from "../../Dashboard";
interface OrderStatistic {
  order_status: string;
  total_orders: number;
}

interface ResponseData {
  order_counts_by_status: OrderStatistic[];
  total_quantity_in_order: string;
}
interface Props {
  dataDonHang: (data: ResponseData) => void;
}
const Chart = ({ dataDonHang }: Props) => {
  const { filter, setFilter } = useContext(DashboardContext);
  const [dataStatic, setDataStatic] = useState<ResponseData | null>(null);
  const getData = async () => {
    let res = await instance.post(`/getorderstatistics`, filter);
    setDataStatic(res?.data);
    dataDonHang(res?.data);
  };
  const chartData =
    dataStatic?.order_counts_by_status?.map((e) => ({
      order_status: e.order_status,
      total_orders: e.total_orders,
    })) ?? [];

  const config = {
    data: chartData,
    xField: "order_status",
    yField: "total_orders",
    columnWidth: 0.3,
    label: {
      position: "middle",
    },
  };
  useEffect(() => {
    getData();
  }, [filter]);
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 text-center ">
        Tổng số sản phẩm trong đơn hàng: {dataStatic?.total_quantity_in_order}
      </h3>
      <Column {...config} />
    </div>
  );
};

export default Chart;
