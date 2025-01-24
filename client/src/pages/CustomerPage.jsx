import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Table } from "antd";
import { useDispatch } from "react-redux";

const CustomerPage = () => {
  // states
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();

  const getAllBills = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const { data } = await axios.get("/api/bills/get-bill");
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });

      console.log(error);
    }
  };

  // useEffect
  useEffect(() => {
    getAllBills();
    // eslint-disable-next-line
  }, []);

  //varibales
  const columns = [
    { title: "ID", dataIndex: "_id", align: "center" },

    {
      title: "Customer Name",
      dataIndex: "customerName",
      align: "center",
    },

    { title: "Customer Number", dataIndex: "customerContact", align: "center" },
  ];

  return (
    <DefaultLayout>
      <h1 className="mb-3">Customer Details</h1>
      <Table
        columns={columns}
        dataSource={billsData}
        bordered
        pagination={false}
      />
    </DefaultLayout>
  );
};

export default CustomerPage;
