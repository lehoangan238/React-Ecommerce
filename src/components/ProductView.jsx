import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useLocation, useNavigate, useParams } from "react-router";

import { useDispatch } from "react-redux";

import { addItem } from "../redux/shopping-cart/cartItemsSlice";
import { remove } from "../redux/product-modal/productModalSlice";
import { toast } from "react-toastify";
import Button from "./Button";

import numberWithCommas from "../utils/numberWithCommas";

const ProductView = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let product = props.product;

  if (product === undefined)
    product = {
      title: "",
      price: "",
      imageURL: "",
      categorySlug: "",
      colors: [],
      slug: "",
      size: [],
      description: "",
    };

  const [previewImg, setPreviewImg] = useState(product.imageURL[0]);

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [color, setColor] = useState(undefined);

  const [size, setSize] = useState(undefined);

  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  useEffect(() => {
    setPreviewImg(product.imageURL[0]);
    setQuantity(1);
    setColor(undefined);
    setSize(undefined);
  }, [product]);

  const check = () => {
    if (color === undefined) {
      toast.error("Vui lòng chọn màu", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }

    if (size === undefined) {
      toast.error("Vui lòng chọn size");
      return false;
    }

    return true;
  };

  const addToCart = () => {
    if (check()) {
      let newItem = {
        slug: product.slug,
        color: color,
        size: size,
        price: product.price,
        quantity: quantity,
        imageURL: product.imageURL[0],
        id: product.id,
      };
      console.log(newItem);
      if (dispatch(addItem(newItem))) {
        toast.success("Đã thêm vào giỏ hàng");
      } else {
        toast.error("Đã có lỗi xảy ra");
      }
    }
  };

  const goToCart = () => {
    if (check()) {
      let newItem = {
        slug: product.slug,
        color: color,
        size: size,
        price: product.price,
        quantity: quantity,
      };
      if (dispatch(addItem(newItem))) {
        dispatch(remove());
        navigate("/cart");
      } else {
        toast.error("Thêm vào giỏ hàng thất bại");
      }
    }
  };

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.imageURL[0])}
          >
            <img src={product.imageURL[0]} alt="" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.imageURL[1])}
          >
            <img src={product.imageURL[1]} alt="" />
          </div>
        </div>
        <div className="product__images__main">
          <img src={previewImg} alt="" />
        </div>
        <div
          className={`product-description ${descriptionExpand ? "expand" : ""}`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product.title}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {numberWithCommas(product.price)}
          </span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Màu sắc</div>
          <div className="product__info__item__list">
            {product.colors.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item.value ? "active" : ""
                }`}
                onClick={() => setColor(item.value)}
              >
                <div className={`circle bg-${item.value}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Kích cỡ</div>
          <div className="product__info__item__list">
            {product.size.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item.value ? "active" : ""
                }`}
                onClick={() => setSize(item.value)}
              >
                <span className="product__info__item__list__item__size">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>
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
        <div className="product__info__item">
          <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
          <Button onClick={() => goToCart()}>mua ngay</Button>
        </div>
      </div>
      <div
        className={`product-description mobile ${
          descriptionExpand ? "expand" : ""
        }`}
      >
        <div className="product-description__title">Chi tiết sản phẩm</div>
        <div
          className="product-description__content"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
        <div className="product-description__toggle">
          <Button
            size="sm"
            onClick={() => setDescriptionExpand(!descriptionExpand)}
          >
            {descriptionExpand ? "Thu gọn" : "Xem thêm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};
const withLocation = (Component) => (props) => {
  const location = useLocation();

  return <Component {...props} location={location} />;
};
export default withLocation(ProductView);
