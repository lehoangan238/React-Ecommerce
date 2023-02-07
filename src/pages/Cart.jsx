import React, { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Helmet from "../components/Helmet";
import CartItem from "../components/CartItem";
import Button from "../components/Button";
import numberWithCommas from "../utils/numberWithCommas";
import {
  save_url,
  selectCartItems,
} from "../redux/shopping-cart/cartItemsSlice";
import useFetchCollection from "../customHooks/useFetchCollection";
import { selectProducts } from "../redux/productSlice/productSlice";
import { selectIsLoggedIn } from "../redux/auth/authSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { data, isLoading } = useFetchCollection("products");
  const isLoggin = useSelector(selectIsLoggedIn);
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
  console.log(cartProducts);
  useEffect(() => {
    setCartProducts(getCartItemsInfo(cartItems));
  }, [cartItems, data, isLoading]);
  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartProducts(getCartItemsInfo(cartItems));
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);
  const checkout = () => {
    if (isLoggin) {
      navigate("/checkout-details");
    } else {
      dispatch(save_url());
      navigate("/login");
    }
  };

  return (
    <>
      <Helmet title="Giỏ hàng">
        <div className="cart">
          <div className="cart__list">
            {isLoading ? (
              <div>loading</div>
            ) : (
              cartProducts.map((item, index) => (
                <CartItem key={index} item={item} />
              ))
            )}
          </div>
          <div className="cart__info">
            <div className="cart__info__txt">
              <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
              <div className="cart__info__txt__price">
                <span>Thành tiền:</span>{" "}
                <span>{numberWithCommas(Number(totalPrice))}</span>
              </div>
            </div>
            <div className="cart__info__btn">
              <Button size="block" onClick={checkout}>
                Đặt hàng
              </Button>
              <Link to="/catalog">
                <Button size="block">Tiếp tục mua hàng</Button>
              </Link>
            </div>
          </div>
        </div>
      </Helmet>
    </>
  );
};

export default Cart;
