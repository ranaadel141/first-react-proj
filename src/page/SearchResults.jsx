import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import SlideProductLoading from "../components/header/slideproduct/SlideProductLoading";
import Product from "../components/header/slideproduct/Product";

function SearchResults() {
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("query");
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/products/search?q=${encodeURIComponent(query)}`,
        );
        const data = await response.json();
        setResults(data.products || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div>
      <PageTransition key={query}>
        <div className="category_products">
          {loading ? (
            <SlideProductLoading key={query} />
          ) : results.length > 0 ? (
            <div className="container">
              <div className="top_slide">
                <h2>Results for : {query}</h2>
              </div>

              <div className="products">
                {results.map((item, index) => (
                  <Product item={item} key={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className="container">
              <p>No Results found.</p>
            </div>
          )}
        </div>
      </PageTransition>
    </div>
  );
}

export default SearchResults;
