import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/Logo-2.png";
import productData from "../assets/fake-data/products";
const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
  {
    display: "Phụ kiện",
    path: "/accessories",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const cartItems = useSelector((state) => state.cartItems.value);
  const headerRef = useRef(null);
  const products = productData.getCartItemsInfo(cartItems);
  // total products
  const totalProducts = cartItems.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );
  console.log(products);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <i className="bx bx-search"></i>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <div className="header__cart">
                <Link to="/cart">
                  <i className="bx bx-shopping-bag"></i>
                </Link>
                <span className="header__card-notice">{totalProducts}</span>
                {/* <div className="header__cart-list">
                  <ul className="header__cart-list-item">
                    <li className="header__cart-item">
                      <img
                        src={product_02_image_01}
                        alt=""
                        className="header__cart-img"
                      />
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            Bàn phím Bluetooth Logitech K380
                          </h5>
                          <span className="header__cart-item-price">
                            595.000đ
                          </span>
                        </div>
                      </div>
                    </li>
                    <li className="header__cart-item">
                      <img
                        src={product_02_image_01}
                        alt=""
                        className="header__cart-img"
                      />
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            Bàn phím Bluetooth Logitech K380
                          </h5>
                          <span className="header__cart-item-price">
                            595.000đ
                          </span>
                        </div>
                      </div>
                    </li>
                    <li className="header__cart-item">
                      <img
                        src={product_02_image_01}
                        alt=""
                        className="header__cart-img"
                      />
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            Bàn phím Bluetooth Logitech K380
                          </h5>
                          <span className="header__cart-item-price">
                            595.000đ
                          </span>
                        </div>
                      </div>
                    </li>
                    {products.map((item, index) => (
                      <li className="header__cart-item" key={index}>
                        <img
                          src={item.product.image01}
                          alt=""
                          className="header__cart-img"
                        />
                        <div className="header__cart-item-info">
                          <div className="header__cart-item-head">
                            <h5 className="header__cart-item-name">
                              {item.product.title}
                            </h5>
                            <span className="header__cart-item-price">
                              {item.price}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>
            </div>

            <div className="header__menu__item header__menu__right__item">
              <i className="bx bx-user"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
