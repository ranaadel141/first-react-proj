import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [suggestions, setSuggestions] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
    setSuggestions([]);
  };

  useEffect(() => {
    const fetchsuggestions = async () => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}`,
        );
        const data = await response.json();
        setSuggestions(data.products.slice(0, 5) || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSuggestions([]);
      }
    };
    const timeout = setTimeout(() => {
      fetchsuggestions();
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);
  console.log(suggestions);

  useEffect(() => {
    setSuggestions([]);
  }, [location]);
  
  return (
    <div className="serchBox-container">
      <form onSubmit={handleSubmit} className="search-box">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search For Products"
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item) => (
            <Link to={`/products/${item.id}`}>
              <li key={item.id}>
                <img src={item.images[0]} alt="" /> <span>{item.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
