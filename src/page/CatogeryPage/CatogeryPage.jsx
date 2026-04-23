import { u } from "framer-motion/client";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "../../components/header/slideproduct/Product";
import "./categorypage.css";
import SlideProductLoading from "../../components/header/slideproduct/SlideProductLoading";
import PageTransition from "../../components/PageTransition";

function CatogeryPage() {
  const { catogory } = useParams();
  const [catogeryProducts, setCatogeryProducts] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${catogory}`)
      .then((res) => res.json())
      .then((data) => setCatogeryProducts(data))
      .catch((error) =>
        console.error("Error fetching category products:", error),
      )
      .finally(() => setLoading(false)
      );
  }, [catogory]);

  return (
       <PageTransition key={catogory}>
        <div className="category_products">
      {loading ? (
        <SlideProductLoading key={catogory} />
      ) : (
        <div className="container">
          <div className="top_slide">
            <h2>{catogory.replace("-", " ")} : {catogeryProducts.limit}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestias, voluptates?
            </p>
          </div>

          <div className="products">
            {catogeryProducts.products.map((item, index) => (
              <Product item={item} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
    </PageTransition>
  );
}

export default CatogeryPage;
