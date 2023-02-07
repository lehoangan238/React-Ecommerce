import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import Grid from "./Grid";

const InfinityList = (props) => {
  const perload = 6;
  const [data, setData] = useState([]);
  const listRef = useRef(null);
  const [load, setLoad] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setData(props.data.slice(0, perload));
    setIndex(1);
  }, [props.data]);
  const handleScroll = () => {
    if (listRef && listRef.current) {
      if (
        window.scrollY + window.innerHeight >=
        listRef.current.clientHeight + listRef.current.offsetTop + 200
      ) {
        console.log("load more");
        setLoad(true);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [listRef]);
  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(props.data.length / perload);
      const maxIndex = props.data.length % perload === 0 ? pages : pages + 1;
      if (load && index <= maxIndex) {
        const start = index * perload;
        const end = start + perload;
        setData([...data, ...props.data.slice(start, end)]);
        setIndex(index + 1);
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, data, props.data]);
  return (
    <div ref={listRef}>
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {data.map((item, index) => (
          <ProductCard
            key={index}
            img01={item.imageURL[0]}
            img02={item.imageURL[1]}
            name={item.title}
            price={Number(item.price)}
            slug={item.slug}
          />
        ))}
      </Grid>
    </div>
  );
};

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default InfinityList;
