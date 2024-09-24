import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const areas = [9984670, 17098242, 2166086, 9372610];
const totalArea = areas.reduce((total, area) => total + area, 0);

const data = {
  labels: ["Canada", "Nga", "Greenland", "Mỹ"],
  datasets: [
    {
      label: "Diện tích (km²)",
      data: areas,
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "top" as const, 
    },
    title: {
      display: true,
      text: "Diện tích các quốc gia",
    },
  },
};


const LocationChart = () => {
  return (
    <div style={{ padding: "0 10px" }}>
      <Bar data={data} options={options} />
      <div
        className="stats-container"
        style={{ marginTop: "20px", width: "100%" }}
      >
        <h4>Thống kê Diện tích</h4>
        {data.labels.map((label, index) => {
          const percentage = (areas[index] / totalArea) * 100;
          return (
            <div
              key={index}
              style={{ margin: "10px 0", width: "100%", borderRadius: "4px" }}
            >
              <div
                style={{
                  width: "100%", // Đặt chiều rộng thành 100%
                  backgroundColor: "rgba(75, 192, 192, 0.6)", // Sử dụng màu sắc thống kê từ biểu đồ
                  color: "#fff",
                  padding: "5px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  display: "flex",
                  justifyContent: "space-between", // Căn chỉnh các phần tử
                  alignItems: "center",
                }}
              >
                <span>
                  {label}: {areas[index].toLocaleString()} km²
                </span>
                <span>{percentage.toFixed(2)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationChart;
