import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary";
import { db } from "../../firebase/config";
import { selectEmail, selectUserID } from "../../redux/auth/authSlice";
import {
  clearCart,
  selectCartItems,
} from "../../redux/shopping-cart/cartItemsSlice";
import styles from "./CheckoutDetails.module.scss";
const initialAddressState = {
  name: "",
  email: "",
  address: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const cartItems = useSelector(selectCartItems);
  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const [totalAmount, setTotalAmount] = useState(0);
  console.log(totalAmount);
  useEffect(() => {
    setTotalAmount(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
  }, [cartItems]);

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: totalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(clearCart());
      toast.success("Order saved");
      navigate("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Shipping Address</h3>
              <label>Họ và Tên</label>
              <input
                type="text"
                placeholder="Họ và Tên"
                required
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
              <label>Email</label>
              <input
                type="text"
                placeholder="Email"
                required
                name="email"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              <label>Số Điện Thoại</label>
              <input
                type="text"
                placeholder="Số Điện Thoại"
                name="phone"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              <label>Địa Chỉ</label>
              <input
                type="text"
                placeholder="Địa Chỉ"
                required
                name="address"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />
              <button type="submit" className="--btn --btn-primary">
                Đặt hàng
              </button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
