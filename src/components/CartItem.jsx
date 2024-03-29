import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import numberWithCommas from "../utils/numberWithCommas";
import { removeItem, updateItem } from "../redux/shopping-cart/cartItemsSlice";
const CartItem = (props) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState(props.item);
  console.log(item);
  const [quantity, setQuantity] = useState(props.item.quantity);
  useEffect(() => {
    setItem(props.item);
    setQuantity(props.item.quantity);
  }, [props.item]);
  const updateQuantity = (type) => {
    if (type === "plus") {
      dispatch(updateItem({ ...item, quantity: Number(item.quantity) + 1 }));
    } else {
      dispatch(
        updateItem({
          ...item,
          quantity:
            Number(item.quantity) - 1 < 1 ? 1 : Number(item.quantity) - 1,
        })
      );
    }
  };
  const removeProduct = () => {
    dispatch(removeItem(item));
  };
  return (
    <>
      {item.product === undefined ? (
        ""
      ) : (
        <div className="cart__item">
          <div className="cart__item__image">
            <img src={item.product.imageURL[0]} alt="" />
          </div>
          <div className="cart__item__info">
            <div className="cart__item__info__name">
              <Link to={`/catalog/${item.slug}`}>
                {`${item.product.title} - ${item.color} - ${item.size}`}
              </Link>
            </div>
            <div className="cart__item__info__price">
              {numberWithCommas(item.price)}
            </div>
            <div className="cart__item__info__quantity">
              <div className="product__info__item__quantity">
                <div
                  className="product__info__item__quantity__btn"
                  onClick={() => updateQuantity("minus")}
                >
                  <i className="bx bx-minus"></i>
                </div>
                <div className="product__info__item__quantity__input">
                  {quantity}
                </div>
                <div
                  className="product__info__item__quantity__btn"
                  onClick={() => updateQuantity("plus")}
                >
                  <i className="bx bx-plus"></i>
                </div>
              </div>
            </div>
            <div className="cart__item__del" onClick={removeProduct}>
              <i className="bx bx-trash"></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
