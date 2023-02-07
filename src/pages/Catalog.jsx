import React, { useCallback, useEffect, useState, useRef } from "react";
import Helmet from "../components/Helmet";
import category from "../assets/fake-data/category";
import productColor from "../assets/fake-data/product-color";
// import sizes from "../assets/fake-data/product-size";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import InfinityList from "../components/InfinityList";
import useFetchCollection from "../customHooks/useFetchCollection";
const sizes = [
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
];
const colors = [
  {
    label: "Trắng",
    value: "white",
  },
  {
    label: "Hồng",
    value: "pink",
  },
  {
    label: "Đen",
    value: "black",
  },
  {
    label: "Vàng",
    value: "yellow",
  },
  {
    label: "Cam",
    value: "orange",
  },
  {
    label: "Xanh dương",
    value: "blue",
  },
];
const Catalog = () => {
  const initFilter = {
    category: [],
    color: [],
    size: [],
  };
  const { data, isLoading } = useFetchCollection("products");
  const [products, setProducts] = useState(data);
  console.log(products);
  const [filter, setFilter] = useState(initFilter);
  console.log(filter);
  const filterRef = useRef(null);
  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item.categorySlug],
          });
          break;
        case "COLOR":
          setFilter({
            ...filter,
            color: [...filter.color, item.color],
          });
          break;
        case "SIZE":
          setFilter({
            ...filter,
            size: [...filter.size, item.value],
          });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(
            (e) => e !== item.categorySlug
          );
          setFilter({
            ...filter,
            category: newCategory,
          });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e) => e !== item.color);
          setFilter({
            ...filter,
            color: newColor,
          });
          break;
        case "SIZE":
          const newSize = filter.size.filter((e) => e !== item.value);
          setFilter({
            ...filter,
            size: newSize,
          });
          break;
        default:
      }
    }
  };

  const updateProductsList = useCallback(() => {
    let temp = data;
    if (filter.category.length > 0) {
      temp = temp.filter((e) => filter.category.includes(e.categorySlug.value));
    }
    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors.find((color) =>
          filter.color.includes(color.value)
        );
        return check !== undefined;
      });
    }
    if (filter.size.length > 0) {
      temp = temp.filter((e) => {
        // const check = e.size.find((size) => filter.size.includes(size));
        // get size of product
        const check = e.size.find((size) => filter.size.includes(size.value));
        return check !== undefined;
      });
    }
    setProducts(temp);
  }, [filter, data]);
  useEffect(() => {
    updateProductsList();
  }, [updateProductsList]);
  const clearFilter = () => setFilter(initFilter);
  const showHideFilter = () => filterRef.current.classList.toggle("active");
  return (
    <Helmet title="Sản phẩm">
      <div className="catalog">
        <div className="catalog__filter " ref={filterRef}>
          <div
            className="catalog__filter__close"
            onClick={() => showHideFilter()}
          >
            <i className="bx bx-left-arrow-alt"></i>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              danh mục sản phẩm
            </div>
            <div className="catalog__filter__widget__content">
              {category.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <Checkbox
                    label={item.display}
                    onChange={(input) => {
                      filterSelect("CATEGORY", input.checked, item);
                    }}
                    checked={filter.category.includes(item.categorySlug)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">màu sắc</div>
            <div className="catalog__filter__widget__content">
              {productColor.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <Checkbox
                    label={item.display}
                    onChange={(input) => {
                      filterSelect("COLOR", input.checked, item);
                    }}
                    checked={filter.color.includes(item.color)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">Kích cỡ</div>
            <div className="catalog__filter__widget__content">
              {sizes.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <Checkbox
                    label={item.label}
                    onChange={(input) => {
                      filterSelect("SIZE", input.checked, item);
                    }}
                    checked={filter.size.includes(item.value)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
              <Button size="sm" onClick={clearFilter}>
                Xoá bộ lọc
              </Button>
            </div>
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <Button size="sm" onClick={() => showHideFilter()}>
            bộ lọc
          </Button>
        </div>
        <div className="catalog__content">
          {isLoading && <div>Loading</div>}
          <InfinityList data={products} />
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
