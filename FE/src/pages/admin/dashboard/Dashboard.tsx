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

const Dashboard = () => {
  return (
    <div className="page-dashboard bg-[#f3f3f9] py-0 px-5 font-[Poppins]">
      <div className="page-dashboard__header flex justify-between py-5">
        <div className="page-dashboard__header__left">
          <p className="text-[14px] font-medium">Good Morning, Anna!</p>
          <span className="text-[12px] text-[#878a99] font-normal mt-[10px]">
            Here's what's happening with your store today.
          </span>
        </div>
        <div className="page-dashboard__header__right flex items-center">
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
        </div>
      </div>
      <div className="page-dashboard__card bg-gray-100 py-0 flex  w-[100%] font-poppins">
        <div className="card-item flex-wrap bg-white w-1/4 p-3 mr-4 rounded shadow-sm hover:transform hover:-translate-y-1 transition-all ease duration-400">
          <div className="flex justify-between">
            <h3 className="text-xs text-gray-400 font-medium">
              TOTAL EARNINGS
            </h3>
            <span className="text-green-500 font-medium">+16.24 %</span>
          </div>
          <p className="text-xl font-semibold text-gray-600 mt-4">$559.25k</p>
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
        <div className="card-item flex-wrap bg-white w-1/4 p-3 mr-4 rounded shadow-sm hover:transform hover:-translate-y-1 transition-all ease duration-400">
          <div className="flex justify-between">
            <h3 className="text-xs text-gray-400 font-medium">ORDERS</h3>
            <span className="order text-red-500 font-medium">- 3.57 %</span>
          </div>
          <p className="text-xl font-semibold text-gray-600 mt-4">36,894</p>
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
        <div className="chart-left bg-white w-[68%] mr-5 shadow">
          <div className="title flex justify-between m-5">
            <p className="text-[#495057] text-[18px] font-medium">Thống kê đơn hàng</p>
            <ul className="flex space-x-2">
              {/* <li className="px-2 py-1 text-[#3577f1] bg-[#E1EBFD] text-[11.375px] rounded-md">
                ALL
              </li>
              <li className="px-2 py-1 text-[#3577f1] bg-[#E1EBFD] text-[11.375px] rounded-md">
                1M
              </li>
              <li className="px-2 py-1 text-[#3577f1] bg-[#E1EBFD] text-[11.375px] rounded-md">
                6M
              </li>
              <li className="px-2 py-1 text-[#3577f1] bg-[#E1EBFD] text-[11.375px] rounded-md">
                1Y
              </li> */}
            </ul>
          </div>
          <Chart />
        </div>
        <div className="chart-right bg-white w-[32%] shadow">
          <p className="title text-[#495057] text-[18px] font-medium m-5">
            Sales by Locations
          </p>
          <LocationChart />
        </div>
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
          <DonutChartWithStats />
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
  );
};

export default Dashboard;
