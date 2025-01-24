/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "../components/DefaultLayout";
import { Col, Row, Select, Input } from "antd";
import ItemsList from "../components/ItemsList";
import { useDispatch } from "react-redux";

const { Option } = Select;

const HomePage = () => {
  // states
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all"); // default to show all items
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { value: "all", label: "Select Category" },
    { value: "Fitness Class", label: "Fitness Class" },
    { value: "Therapy Session", label: "Therapy Session" },
    { value: "Workshop", label: "Workshop" },
  ];

  // useEffect
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({ type: "SHOW_LOADING" });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        console.log(error);
      }
    };
    getAllItems();
  }, []);

  const handleCategoryChange = (value) => {
    setSelectCategory(value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = itemsData.filter((item) => {
    const matchesCategory =
      selectCategory === "all" || item.category === selectCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-center mb-3">
        <Select
          style={{ width: 200, marginRight: 16 }}
          placeholder="Select a category"
          onChange={handleCategoryChange}
          value={selectCategory}
        >
          {categories.map((category) => (
            <Option key={category.value} value={category.value}>
              {category.label}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="Search items"
          onChange={handleSearch}
          style={{ width: 200 }}
          value={searchQuery}
        />
      </div>
      <Row gutter={[16, 16]}>
        {filteredItems.map((item) => (
          <Col xs={24} lg={6} md={12} sm={6} key={item.id}>
            <ItemsList item={item} />
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
};

export default HomePage;
