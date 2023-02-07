import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItems } from "../../redux/shopping-cart/cartItemsSlice";
import Card from "../../components/Card";
import styles from "./CheckoutSummary.module.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";
import numberWithCommas from "../../utils/numberWithCommas";
const CheckoutSummary = (props) => {
  const cartItems = useSelector(selectCartItems);
  const { data, isLoading } = useFetchCollection("products");
  const getProductBySlug = (slug) => data.find((e) => e.slug === slug);
  const getCartItemsInfo = (cartItems) => {
    const cartProducts = [];
    cartItems.forEach((item) => {
      let product = getProductBySlug(item.slug);
      if (product) {
        cartProducts.push({
          ...item,
          product: product,
        });
      }
    });
    return cartProducts;
  };

  const [cartProducts, setCartProducts] = useState(getCartItemsInfo(cartItems));
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  // send cartTotalAmount to parent component

  useEffect(() => {
    setCartProducts(getCartItemsInfo(cartItems));
    setCartTotalAmount(
      cartProducts.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
    // send cartTotalAmount to parent component
  }, [cartItems, data, isLoading]);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div>
        <h3>Checkout Summary</h3>
        {cartItems.length === 0 ? (
          <>
            <p>No item in your cart.</p>
            <button className="--btn">
              <Link to="/#products">Back To Shop</Link>
            </button>
          </>
        ) : (
          <div>
            <p>{/* <b>{`Cart item(s): ${cartTotalQuantity}`}</b> */}</p>
            <div className={styles.text}>
              <h4>Subtotal:</h4>
              <h3>{numberWithCommas(cartTotalAmount)} đ</h3>
            </div>
            {cartProducts.map((item) => {
              const { id, product, price, quantity, color, size } = item;
              return (
                <Card key={id} cardClass={styles.card}>
                  <h4>Product: {`${product.title} - ${color} - ${size}`}</h4>
                  <p>Quantity: {quantity}</p>
                  <p>Unit price: {numberWithCommas(price)}</p>
                  <p>Set price: {numberWithCommas(price * quantity)}</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutSummary;
