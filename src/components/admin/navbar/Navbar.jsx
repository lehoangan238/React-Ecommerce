import React from "react";
import styles from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";
const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");
const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <h4></h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
