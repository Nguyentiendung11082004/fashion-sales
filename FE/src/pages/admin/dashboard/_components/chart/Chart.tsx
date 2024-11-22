import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/charts';
import instance from '@/configs/axios';
interface OrderStatistic {
      order_status: string;
      total_orders: number;
}

interface ResponseData {
      order_counts_by_status: OrderStatistic[];
      total_quantity_in_order: string;
}

const Chart = () => {
      const [dataStatic, setDataStatic] = useState<ResponseData | null>(null);
      const getData = async () => {
            let res = await instance.get(`/getorderstatistics`);
            setDataStatic(res?.data);
      }
      const chartData = dataStatic?.order_counts_by_status?.map((e) => ({
            order_status: e.order_status,
            total_orders: e.total_orders,
      })) ?? [];

      const config = {
            data: chartData,
            xField: 'order_status', // Trục X là trạng thái đơn hàng
            yField: 'total_orders', // Trục Y là số lượng đơn hàng
            columnWidth: 0.3, // Độ rộng của các cột
            label: {
                  position: 'middle', // Vị trí nhãn nằm ở giữa cột
            },
      };
      useEffect(() => {
            getData()
      }, [])
      return (
            <div>
                  <h3 className="text-xl font-semibold text-gray-800 text-center ">
                        Tổng số đơn hàng: {dataStatic?.total_quantity_in_order}
                  </h3>
                  <Column {...config} />
            </div>
      );
};

export default Chart;
