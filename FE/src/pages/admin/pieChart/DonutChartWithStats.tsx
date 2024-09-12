import React from "react";
import { Pie } from "@ant-design/charts";
import { Tag, Select } from "antd";
const { Option } = Select;
// const { Title } = Typography;

const DonutChartWithLegend = () => {
  const data = [
    { type: "Canada", value: 27, color: "#3FC1C9" },
    { type: "Nga", value: 25, color: "#F9C74F" },
    { type: "Greenland", value: 18, color: "#F94144" },
    { type: "Mỹ", value: 30, color: "#90BE6D" },
  ];

  // const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const config = {
    height: 350,
    appendPadding: 0,
    data,
    angleField: "value",
    colorField: "type",
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
    <div className="" style={{ paddingTop: "px" }}>
      <div
        style={{
          margin: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "500" }}>
          Store Visits by Source
        </h3>
        <Select
          placeholder="Report"
          style={{ width: 100, border: "none" }}
          allowClear
        >
          <Option value={1}>Dowload Report</Option>
          <Option value={10}>Export</Option>
          <Option value={30}> Import</Option>
        </Select>
      </div>
      <Pie {...config} style={{ marginBottom: 0 }} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data.map((item) => (
          <div
            key={item.type}
            style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
          >
            <Tag
              color={item.color}
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                backgroundColor: item.color,
              }}
            />
            <span style={{ marginRight: 4 }}>{item.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChartWithLegend;
