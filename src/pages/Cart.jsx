import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet";
import productData from "../assets/fake-data/products";
import numberWithCommas from "../utils/numberWithCommas";
import { useSelector } from "react-redux";
const Cart = () => {
  const cartItem = useSelector((state) => state.cartItems.value);
  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {});
  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">cart</div>
    </Helmet>
  );
};

export default Cart;
