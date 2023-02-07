import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet";
import HeroSlider from "../components/HeroSlider";
import heroSliderData from "../assets/fake-data/hero-slider";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import policy from "../assets/fake-data/policy";
import PolicyCard from "../components/PolicyCard";
import Grid from "../components/Grid";
import productData from "../assets/fake-data/products";
import ProductCard from "../components/ProductCard";
import banner from "../assets/images/banner.png";
import { Link } from "react-router-dom";

import useFetchCollection from "../customHooks/useFetchCollection";
import { Provider, useDispatch } from "react-redux";
import { STORE_PRODUCTS } from "../redux/productSlice/productSlice";
import useFetchDocument from "../customHooks/useFetchDocument";
import loading from "../assets/images/loading.gif";

const Home = () => {
  const { data, isLoading } = useFetchCollection("products");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_PRODUCTS(data));
  }, [data, dispatch]);

  const getProducts = (count) => {
    const max = data.length - count;
    const min = 0;
    const start = Math.floor(Math.random() * (max - min) + min);
    return data.slice(start, start + count);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet title="Trang chủ">
        <HeroSlider
          data={heroSliderData}
          control={true}
          auto={true}
          timeout={5000}
        />
        <Section>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {policy.map((item, index) => (
                <PolicyCard
                  key={index}
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              ))}
            </Grid>
          </SectionBody>
        </Section>
        <Section>
          <SectionTitle> Top sản phẩm bán chạy</SectionTitle>
          <SectionBody>
            {isLoading ? (
              <img
                src={loading}
                alt="atl"
                style={{ width: "50px" }}
                className="--center-all"
              />
            ) : (
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {getProducts(4).map((item, index) => (
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
            )}
          </SectionBody>
        </Section>
        <Section>
          <SectionBody>
            <Link to="/catalog">
              <img src={banner} alt="" />
            </Link>
          </SectionBody>
        </Section>
        <Section>
          <SectionTitle>phổ biến</SectionTitle>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {productData.getProducts(12).map((item, index) => (
                <ProductCard
                  key={index}
                  img01={item.image01}
                  img02={item.image02}
                  name={item.title}
                  price={Number(item.price)}
                  slug={item.slug}
                />
              ))}
            </Grid>
          </SectionBody>
        </Section>
      </Helmet>
    </>
  );
};

export default Home;
