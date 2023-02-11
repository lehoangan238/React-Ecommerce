import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import Grid from "../components/Grid";
import ProductView from "../components/ProductView";

import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import loading from "../assets/images/loading.gif";
import useFetchCollection from "../customHooks/useFetchCollection";
import StarsRating from "react-star-rate";
import Card from "../components/Card";
const Product = () => {
  const { slug } = useParams();
  // const [product, setProduct] = useState(null);

  const { data, isLoading } = useFetchCollection("products");
  console.log(data);
  // change data to products
  const { data: reviews } = useFetchCollection("reviews");

  // get product by slug
  const getProductBySlug = data?.find((item) => item.slug === slug);
  // useEffect(() => {
  //   setProduct(getProductBySlug);
  // }, [getProductBySlug]);
  const relatedProducts = data?.filter((item) => item.slug !== slug);
  // get reviews by product id
  const filteredReviews = reviews?.filter(
    (item) => item.slug === getProductBySlug?.slug
  );
  console.log(getProductBySlug?.title);
  return (
    <Helmet title={getProductBySlug?.title}>
      <Section>
        <SectionBody>
          {isLoading ? (
            <img
              src={loading}
              alt="atl"
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <ProductView product={getProductBySlug} />
          )}
        </SectionBody>
      </Section>
      <Section>
        <Card cardClass={["card"]}>
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div key={index}>
                      <StarsRating value={rate} className="review" />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>by: {userName}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {relatedProducts.map((item, index) => (
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
        </SectionBody>
      </Section>
    </Helmet>
    // <div>details</div>
  );
};

export default Product;
