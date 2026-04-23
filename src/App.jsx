import TopHeader from "./components/header/TopHeader";
import BottomHeader from "./components/header/BottomHeader";
import Home from "./page/home/Home";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./page/productDetails/ProductDetails";
import Cart from "./page/Cart/Cart";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import CatogeryPage from "./page/CatogeryPage/CatogeryPage";
import SearchResults from "./page/SearchResults";
import Favorites from "./page/favorites/Favorites";

function App() {
  return (
    <>
      <header>
        <TopHeader />
        <BottomHeader />
      </header>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#e9e9e9",
            borderRadius: "5px",
            padding: "14px",
          },
        }}
      />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/category/:catogory" element={<CatogeryPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
