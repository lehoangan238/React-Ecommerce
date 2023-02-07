import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./sass/index.scss";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductViewModal from "./components/ProductViewModal";
import {
  Admin,
  Cart,
  Catalog,
  CheckoutDetails,
  CheckoutSuccess,
  Home,
  Login,
  OrderDetails,
  OrderHistory,
  Product,
  Register,
} from "./pages";
import { ToastContainer } from "react-toastify";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Header />
          <div className="container">
            <div className="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog/:slug" element={<Product />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="/checkout-details" element={<CheckoutDetails />} />
                <Route path="/checkout-success" element={<CheckoutSuccess />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/order-details/:id" element={<OrderDetails />} />
              </Routes>
            </div>
          </div>
          <Footer />
          <ProductViewModal />
        </div>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
