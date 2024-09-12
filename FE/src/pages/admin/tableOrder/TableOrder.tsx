import React from "react";
import { Table, Tag, Button } from "antd";

const TableOrder: React.FC = () => {
  const orders = [
    {
      key: "#VZ2112",
      customer: "Alex Smith",
      product: "Clothes",
      amount: "$109.00",
      vendor: "Zoetic Fashion",
      status: "Paid",
      rating: { score: 5.0, votes: 61 },
      avatar: "assets/images/users/avatar-1.jpg",
    },
    {
      key: "#VZ2111",
      customer: "Jansh Brown",
      product: "Kitchen Storage",
      amount: "$149.00",
      vendor: "Micro Design",
      status: "Pending",
      rating: { score: 4.5, votes: 61 },
      avatar: "assets/images/users/avatar-2.jpg",
    },
    {
      key: "#VZ2109",
      customer: "Ayaan Bowen",
      product: "Bike Accessories",
      amount: "$215.00",
      vendor: "Nesta Technologies",
      status: "Paid",
      rating: { score: 4.9, votes: 89 },
      avatar: "assets/images/users/avatar-3.jpg",
    },
    {
      key: "#VZ2108",
      customer: "Prezy Mark",
      product: "Furniture",
      amount: "$199.00",
      vendor: "Syntyce Solutions",
      status: "Unpaid",
      rating: { score: 4.3, votes: 47 },
      avatar: "assets/images/users/avatar-4.jpg",
    },
    {
      key: "#VZ2107",
      customer: "Vihan Hudda",
      product: "Bags and Wallets",
      amount: "$330.00",
      vendor: "iTest Factory",
      status: "Paid",
      rating: { score: 4.7, votes: 161 },
      avatar: "assets/images/users/avatar-6.jpg",
    },
  ];

  const columns = [
    {
      title: "Order ID",
      dataIndex: "key",
      render: (text: string) => (
        <a
          href="apps-ecommerce-order-details.html"
          className="fw-medium link-primary"
        >
          {text}
        </a>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      render: (record: { avatar: string | undefined; customer: string }) => (
        <div className="d-flex align-items-center">
          <img
            src={record.avatar}
            alt=""
            className="avatar-xs rounded-circle me-2"
          />
          {record.customer}
        </div>
      ),
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text: string) => <span className="text-success">{text}</span>,
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "Paid"
              ? "green"
              : status === "Pending"
                ? "orange"
                : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (rating: { score: number; votes: number }) => (
        <span>
          {rating.score}{" "}
          <span className="text-muted fs-11">({rating.votes} votes)</span>
        </span>
      ),
    },
  ];

  return (
    <div className="card">
      <div
        className=""
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h4 className="" style={{ fontSize: "16px", fontWeight: "500" }}>
          Recent Orders
        </h4>
        <Button style={{ backgroundColor: "#e1ebfd" }} className="btn-sm">
          <i className="ri-file-list-3-line align-middle"></i> Generate Report
        </Button>
      </div>
      <div
        className="card-body"
        style={{ marginTop: "20px", fontWeight: "500" }}
      >
        <Table dataSource={orders} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default TableOrder;
