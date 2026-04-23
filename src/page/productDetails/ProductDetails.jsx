import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productdetails.css";
import ProductDetailsLoading from "./ProductDetailsLoading";
import SlideProduct from "../../components/header/slideproduct/SlideProduct";
import SlideProductLoading from "../../components/header/slideproduct/SlideProductLoading";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";

function ProductDetails() {
  const id = useParams();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${apiUrl}/products/${id.id}`);
        const data = await res.json();
        setProduct(data);
        fetchRelatedProducts(data.category);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async (category) => {
      fetch(`${apiUrl}/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
          setRelatedProducts(data.products);
          setLoadingRelated(false);
        })
        .catch((error) => {
          console.error("Error fetching related products:", error);
          setLoadingRelated(false);
        });
    };

    fetchProduct();

  }, [id]);

  if (loading) {
    return <ProductDetailsLoading />;
  }
  if (!product) return <p>Product not found</p>;

  return (
    <pageTransition key={id}>
      <div>
        {loading ? (
          <ProductDetailsLoading />
        ) : (
          <div className="item-details">
            <div className="container">
              <ProductImages product={product} />
              <ProductInfo product={product} />
            </div>
          </div>
        )}

        {loadingRelated ? (
          <SlideProductLoading />
        ) : (
          <SlideProduct
            key={product.category}
            data={relatedProducts}
            title={product.category.replace("-", " ")}
          />
        )}
      </div>
    </pageTransition>
  );
}

export default ProductDetails;
