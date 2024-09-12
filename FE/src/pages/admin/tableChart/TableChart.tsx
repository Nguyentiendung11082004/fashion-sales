import React from "react";
import { Space, Table, Tag, Select } from "antd";

const { Column } = Table;
const { Option } = Select;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  tags: string[];
  createdAt: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "John",
    age: 32,
    address: "New York No",
    tags: ["nice", "developer"],
    createdAt: "2023-07-10",
  },
  {
    key: "2",
    name: "Jane",
    age: 42,
    address: "London No",
    tags: ["loser"],
    createdAt: "2023-07-20",
  },
  {
    key: "3",
    name: "Tom",
    age: 32,
    address: "Sydney No",
    tags: ["cool", "teacher"],
    createdAt: "2023-06-15",
  },
  {
    key: "4",
    name: "Jane",
    age: 42,
    address: "London No",
    tags: ["loser"],
    createdAt: "2023-07-20",
  },
  {
    key: "5",
    name: "John",
    age: 32,
    address: "New York No",
    tags: ["nice", "developer"],
    createdAt: "2023-07-10",
  },
];

const TableProduct: React.FC = () => {
  return (
    <div>
      <div
        style={{
          margin: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "500" }}>
          Best Selling Products
        </h3>
        <Select
          placeholder="Today"
          style={{ width: 150, border: "none" }}
          allowClear
        >
          <Option value={1}>Today</Option>
          <Option value={10}>Yesterday</Option>
          <Option value={30}>Last 7 Days</Option>
          <Option value={70}>Last 30 Days</Option>
          <Option value={70}>This Month</Option>
          <Option value={70}>Last Month</Option>
        </Select>
      </div>
      <Table dataSource={data} pagination={false} style={{ fontSize: "12px" }}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags: string[]) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? "geekblue" : "green";
                if (tag === "loser") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={() => (
            <Space size="middle">
              <a>Invite </a>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default TableProduct;
