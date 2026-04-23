import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";
import "./header.css";
import { Link, useLocation } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";

const NavLinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Acccessories", link: "/accessories" },
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
];

function BottomHeader() {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [isCatogeryOpen, setIsCatogeryOpen] = useState(false);

  useEffect(() => {
    setIsCatogeryOpen(false);
  }, [location]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="bottom-header">
      <div className="container">
        <div className="nav">
          <div className="catogery-nav">
            <div
              className="catogery-btn"
              onClick={() => setIsCatogeryOpen(!isCatogeryOpen)}
            >
              <IoMenu />
              <p>Browse Category</p>
              <MdOutlineArrowDropDown />
            </div>
            <div
              className={`nav-catogery-list ${isCatogeryOpen ? "active" : ""}`}
            >
              {categories.map((category) => (
                <Link key={category.slug} to={`/category/${category.slug}`}>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="nav-links">
            {NavLinks.map((item) => (
              <li
                key={item.link}
                className={location.pathname === item.link ? "active" : ""}
              >
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </div>
        </div>

        <div className="nav-regs-icon">
          <Link to="/">
            <PiSignInBold />
          </Link>
          <Link to="/">
            <FaUserPlus />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BottomHeader;
