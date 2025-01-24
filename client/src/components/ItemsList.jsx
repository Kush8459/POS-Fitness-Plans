import React from "react";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";

const ItemsList = ({ item }) => {
  const { Meta } = Card;
  const dispatch = useDispatch();

  // Handle Cart Update
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: 1 },
    });
  };

  return (
    <>
      <Card
        style={{ width: 240, margin: "20px" }}
        cover={
          <img alt={item.name} src={item.image} style={{ height: "200px" }} />
        }
      >
        <Meta title={item.name} />
        <br />
        <Meta title={`₹ ${item.price}`} />
        <div className="item-button">
          <Button onClick={() => handleAddToCart()}>Add to Cart</Button>
        </div>
      </Card>
    </>
  );
};

export default ItemsList;
