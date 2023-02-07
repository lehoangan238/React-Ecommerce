import React, { useEffect, useState } from "react";
import useFetchCollection from "./useFetchCollection";

const ProductData = () => {
  const [products, setProducts] = useState([]);
  const { data } = useFetchCollection("products");
  useEffect(() => {
    setProducts(data);
  }, [data]);
  console.log("products", products);

  const getProducts = (count) => {
    const max = data.length - count;
    const min = 0;
    const start = Math.floor(Math.random() * (max - min) + min);
    return data.slice(start, start + count);
  };
  const getProductBySlug = (slug) => data.find((e) => e.slug === slug);
  const getCartItemsInfo = (cartItems) => {
    let res = [];
    if (cartItems.length > 0) {
      cartItems.forEach((e) => {
        let product = getProductBySlug(e.slug);
        if (product) {
          res.push({
            ...e,
            product: product,
          });
        }
      });
    }
    return res.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  };
  useEffect(() => {}, []);
  return { data, getProducts, getProductBySlug, getCartItemsInfo };
};

export default ProductData;
