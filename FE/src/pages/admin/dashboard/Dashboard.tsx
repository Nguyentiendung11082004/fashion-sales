import TableSeller from "@/pages/admin/tableSeller/TableSeller";
import {
  faBagShopping,
  faBedPulse,
  faCalendar,
  faDollarSign,
  faGear,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DonutChartWithStats from "./_components/pieChart/DonutChartWithStats";
import TableProduct from "../products/_components/TableProduct";
import TableOrder from "../tableOrder/TableOrder";
import Chart from "./_components/chart/Chart";
import LocationChart from "./_components/locationChart/LocationChart";
import { createContext, useState } from "react";
const { Option } = Select;
import { DatePicker, Select, Space } from 'antd';
const { RangePicker } = DatePicker;
import type { DatePickerProps, GetProps } from 'antd';
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
import dayjs from 'dayjs';
import { FormatMoney } from "@/common/utils/utils";
export const DashboardContext = createContext<any | undefined>(undefined);

const Dashboard = () => {
  const [filter, setFilter] = useState<any>({
    filter_end_date: null,
    filter_start_date: null,
    filter_type: "day",
    filter_value: new Date().toISOString().split('T')[0],
  })
  const [inputRange, setInputRange] = useState(false);
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    let formattedDate = '';
    if (filter.filter_type === 'day') {
      formattedDate = date ? date.format('YYYY-MM-DD') : '';
    } else if (filter.filter_type === 'week') {
      // Nếu là "week", tính toán và lưu tuần (chỉ lưu năm và tuần)
      if (date) {
        // const year = date.year(); 
        // // Tính tuần trong năm từ ngày đã chọn
        // const weekNumber = date.week(); 
        // // Format lại thành "YYYY-Wn" (ví dụ: "2024-W12")
        // formattedDate = `${year}-W${weekNumber}`;
      }
    }
    else if (filter.filter_type === 'month') {
      if (date) {
        formattedDate = date.format('YYYY-MM'); // Lưu tháng dưới dạng YYYY-MM
      }
    } else if (filter.filter_type === 'year') {
      // Nếu là "year", chỉ lưu năm
      if (date) {
        formattedDate = date.format('YYYY');
      }
    }

    // Cập nhật state với giá trị đã format
    setFilter((prev: any) => ({
      ...prev,
      filter_value: formattedDate,
    }));
  };

  const filterRange = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('filterRange: ', value);
  };
  const hanldeChangeType = (type: string) => {
    switch (type) {
      case "day":
        setInputRange(false)
        setFilter((prev: any) => ({ ...prev, filter_type: type }))
        break;
      case "week":
        setInputRange(false)

        setFilter((prev: any) => ({ ...prev, filter_type: type }))
        break;
      case "month":
        setInputRange(false)

        setFilter((prev: any) => ({ ...prev, filter_type: type }))
        break;
      case "year":
        setInputRange(false)

        setFilter((prev: any) => ({ ...prev, filter_type: type }))
        break;
      case "range":
        setInputRange(true)
        setFilter((prev: any) => ({ ...prev, filter_type: type }))
      default:
        break;
    }
  }
  const [tongDonHang, setTongDonHang] = useState<any>([]);
  const [tongDoanhThu, setTongDoanhThu] = useState<any>([]);
  const handleDonHang = (data: any) => {
    setTongDonHang(data)
  }
  const handleDoanhThu = (data:any) => {
    setTongDoanhThu(FormatMoney(data))
  }
  const _props = {
    filter,
    setFilter
  }
  return (
    <DashboardContext.Provider value={_props}>
      <div className="page-dashboard bg-[#f3f3f9] py-0 px-5 font-[Poppins]">
        <div className="page-dashboard__header flex justify-between items-center py-5">
          <div className="page-dashboard__header__left">
            <p className="text-[14px] font-medium">Good Morning, Anna!</p>
          </div>
          <div >
            <Select
              placeholder="Chọn kiểu tìm kiếm"
              style={{ width: 280, height: '38px' }}
              className="border-none mr-5"
              onChange={hanldeChangeType}
              allowClear
            >
              <Option value="day">Tìm theo ngày</Option>
              <Option value="month">Tìm theo tháng</Option>
              <Option value="year">Tìm theo năm</Option>
              <Option value="range">Tìm theo khoảng</Option>
            </Select>
            {
              inputRange === false && <DatePicker
                onChange={onChange}
                style={{ width: 280 }}
                className="border border-gray-300 rounded-lg p-2 mt-4  text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Chọn"
                picker={filter.filter_type === 'day' ? 'date' : filter.filter_type}
              />
            }
            {
              inputRange === true && <RangePicker className="mt-4"
                onChange={(value, dateString) => {
                  setFilter((prev: any) => ({
                    // ...prev,
                    filter_type: "range",
                    filter_start_date: dateString[0],
                    filter_end_date: dateString[1],
                  }))
                }}
                onOk={filterRange}
              />
            }
          </div>
          {/* <div className="page-dashboard__header__right flex items-center">
            <div className="relative">
              <input type="date" className="w-[210px] h-[31px] rounded-md pl-3" />
              <FontAwesomeIcon
                className="date-icon absolute right-0 top-[2%] text-white bg-[#045189] p-2 rounded-r-md"
                icon={faCalendar}
              />
            </div>
            <button className="product-add w-[114px] h-[32px] bg-[#DAF4F0] rounded-md mx-5 text-[#0AB39C] hover:bg-[#0AB39C] hover:text-white flex items-center justify-center">
              <FontAwesomeIcon className="mr-2" icon={faPlus} /> Add product
            </button>
            <button className="bedpulse w-[33px] h-[33px] bg-[#DFF0FA] hover:bg-[#299CDB] rounded-md">
              <FontAwesomeIcon icon={faBedPulse} />
            </button>
          </div> */}
        </div>
        <div className="page-dashboard__card bg-gray-100 py-0 flex  w-[100%] font-poppins">
          <div className="card-item flex-wrap bg-white w-1/4 p-3 mr-4 rounded shadow-sm hover:transform hover:-translate-y-1 transition-all ease duration-400">
            <div className="flex justify-between">
              <h3 className="text-xs text-gray-400 font-medium">
                Doanh thu
              </h3>
              {/* <span className="text-green-500 font-medium">+16.24 %</span> */}
            </div>
            <p className="text-xl font-semibold text-gray-600 mt-4">{tongDoanhThu}</p>
            <div className="flex justify-between items-center">
              <a
                href="#"
                className="text-blue-600 text-xs underline font-poppins"
              >
                View net earnings
              </a>
              <button className="btn-faDollarSign w-10 h-10 bg-green-100 text-green-500 rounded">
                <FontAwesomeIcon className="icon text-lg" icon={faDollarSign} />
              </button>
            </div>
          </div>
          <div className=" flex-wrap bg-white w-1/4 p-3 mr-4 rounded shadow-sm hover:transform hover:-translate-y-1 transition-all ease duration-400">
            <div className="flex justify-between">
              <h3 className="text-xs text-gray-400 font-bold">Tổng số đơn hàng</h3>
              <span className="order text-red-500 font-medium">- 3.57 %</span>
            </div>
            <p className="text-xl font-semibold text-gray-600 mt-4">{tongDonHang?.total_quantity_in_order}</p>
            <div className="flex justify-between items-center">
              <a
                href="#"
                className="text-blue-600 text-xs underline font-poppins"
              >
                View all orders
              </a>
              <button className="btn-faBagShopping w-10 h-10 bg-blue-100 text-blue-500 rounded">
                <FontAwesomeIcon className="icon text-lg" icon={faBagShopping} />
              </button>
            </div>
          </div>
          <div className="card-item flex-wrap bg-white w-1/4 p-3 mr-4 rounded shadow-sm hover:transform hover:-translate-y-1 transition-all ease duration-400">
            <div className="flex justify-between">
              <h3 className="text-xs text-gray-400 font-medium">CUSTOMERS</h3>
              <span className="text-green-500 font-medium">+29.08 %</span>
            </div>
            <p className="text-xl font-semibold text-gray-600 mt-4">183.35M</p>
            <div className="flex justify-between items-center">
              <a
                href="#"
                className="text-blue-600 text-xs underline font-poppins"
              >
                See details
              </a>
              <button className="btn-faUser w-10 h-10 bg-yellow-100 text-yellow-500 rounded">
                <FontAwesomeIcon className="icon text-lg" icon={faUser} />
              </button>
            </div>
          </div>
          <div className="card-item flex-wrap bg-white w-1/4 p-3 rounded shadow-sm hover:transform hover:-translate-y-1 transition-all ease duration-400">
            <div className="flex justify-between">
              <h3 className="text-xs text-gray-400 font-medium">MY BALANCE</h3>
              <span className="text-green-500 font-medium">+0.00 %</span>
            </div>
            <p className="text-xl font-semibold text-gray-600 mt-4">$165.89k</p>
            <div className="flex justify-between items-center">
              <a
                href="#"
                className="text-blue-600 text-xs underline font-poppins"
              >
                Withdraw money
              </a>
              <button className="btn-faBagShopping w-10 h-10 bg-blue-100 text-blue-500 rounded">
                <FontAwesomeIcon icon={faBagShopping} />
              </button>
            </div>
          </div>
        </div>

        <div className="page-dashboard__chart flex mt-5">
          {/* <div className="chart-left bg-white w-[29%] mr-5 shadow">
            <div className="title flex justify-between m-5">
              <p className="text-[#495057] text-[18px] font-medium">Thống kê đơn hàng</p>

            </div>
            <Chart dataDonHang={handleDonHang} />
          </div> */}
          <div className="chart-right bg-white w-[100%] shadow">
            <DonutChartWithStats dataDoanhThu={handleDoanhThu} />
          </div>
        </div>

        <div className="chart-left bg-white w-[100%] mr-5 shadow">
          <div className="title flex justify-between m-5">
            <h3 className="text-xl font-semibold text-gray-800 mt-5">
              Thống kê đơn hàng
            </h3>

          </div>
          <Chart dataDonHang={handleDonHang} />
        </div>
        <div className="page-dashboard__table ">
          <div className="table-product mt-[20px]">
            <TableProduct />
          </div>
          <div className="table-seller">
            {/* <TableSeller /> */}
          </div>
        </div>
        <div className="w-[50%]">
          <div className="chart-source">
            {/* <DonutChartWithStats /> */}
          </div>
          <div className="table-order">
            {/* <TableOrder />   */}
          </div>
          <div></div>
        </div>
        <div className="page-dashboard__btn">
          <button>
            {/* <FontAwesomeIcon className="btn-setting" icon={faGear} /> */}
          </button>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
