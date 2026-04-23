import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { CartContext } from "../context/CartContext";
import "./header.css";
import SearchBox from "./SearchBox";

function TopHeader() {

   const { cartItems, favorites } = useContext(CartContext);
  return (
    <div>
      <div className="top-header">
        <div className="container">
          <Link className="logo" to="/">
            <img src={logo} alt="logo" />
          </Link>
        <SearchBox />
          <div className="header-icons">
          <div className="icon">
            <Link to="/favorites">
              <FaRegHeart />
              <span className="count">{favorites.length}</span>
            </Link>
          </div>

          <div className="icon">
            <Link to="/cart">
              <TiShoppingCart />
              <span className="count">{cartItems.length}</span>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
