import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Table, Form, Input, Select, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  //states
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const { cartItems } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Functions
  //Handle Increment
  const handleIncrement = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  // Handle Decrement
  const handleDecrement = (record) => {
    if (record.quantity !== 1)
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
  };

  //varibales
  const columns = [
    { title: "Name", dataIndex: "name", align: "center" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
      align: "center",
    },
    { title: "Price ₹", dataIndex: "price", align: "center" },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div style={{ textAlign: "center" }}>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncrement(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecrement(record)}
          />
        </div>
      ),
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer", textAlign: "center" }}
          onClick={() =>
            dispatch({
              type: "DELETE_FROM_CART",
              payload: record,
            })
          }
        />
      ),
      align: "center",
    },
  ];

  // useEffect
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);

  // Handle Submit
  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        subTotal,
        cartItems,
        tax: Number(((subTotal / 100) * 10).toFixed(2)),
        totalAmount: Number(
          Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
        ),
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };
      // console.log(newObject);
      await axios.post("/api/bills/add-bill", newObject);
      message.success("Bill Generated Successfully");
      dispatch({ type: "CLEAR_CART" });
      localStorage.removeItem("cartItems");
      navigate("/bills");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItems} bordered />
      <div className="d-flex align-items-end flex-column">
        <hr />
        <h3>
          SUB TOTAL: <b>₹ {subTotal}/-</b>
        </h3>
        <Button type="primary" onClick={() => setBillPopup(true)}>
          Create Invoice
        </Button>
      </div>
      <Modal
        title="Create Invoice"
        visible={billPopup}
        onCancel={() => setBillPopup(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerContact" label="Contact Number">
            <Input />
          </Form.Item>

          <Form.Item name="paymentMode" label="Payment Method">
            <Select>
              <Select.Option value="cash">CASH</Select.Option>
              <Select.Option value="card">CARD</Select.Option>
            </Select>
          </Form.Item>

          <div className="d-flex justify-content-between">
            <div className="bill-item">
              <h5>
                SUB TOTAL: <b>₹ {subTotal}/-</b>
              </h5>
              <h5>
                TAX: <b>₹ {((subTotal / 100) * 10).toFixed(2)}/-</b>
              </h5>
              <h4>
                GRAND TOTAL:{" "}
                <b>
                ₹ 
                  {Number(subTotal) +
                    Number(((subTotal / 100) * 10).toFixed(2))}
                  /-
                </b>
              </h4>
            </div>
            <div className="d-flex align-items-end">
              <Button type="primary" htmlType="submit">
                Generate Bill
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;
