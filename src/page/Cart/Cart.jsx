import React from "react";
import { useContext } from "react";
import { CartContext } from "../../components/context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import "./cart.css";
import PageTransition from "../../components/PageTransition";

function Cart() {
    const {cartItems , increaseQuantity , decreaseQuantity , removeFromCart} = useContext(CartContext)

    const total = cartItems.reduce((acc , item) => acc + item.price * item.quantity, 0)

  return (
   <PageTransition>
     <div className="checkout">
      <div className="order-summary">
        <h1>Order Summary</h1>
        <div className="items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div className="item-cart" key={index}>
                <div className="img-name">
                  <img src={item.images[0]} alt={item.title} />
                  <div className="content">
                    <h2>{item.title}</h2>
                    <p className="price-item">
                      Price: ${item.price.toFixed(2)}
                    </p>
                    <div className="quantity-control">
                      <button onClick={() => decreaseQuantity(item.id)}>
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>
                    </div>
                  </div>

                  <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bottom-summary">
          <div className="shop-table">
            <p>Total:</p>
            <span className="total-checkout">${total.toFixed(2)}</span>
          </div>
          <div className="button-div">
            <button type="submit">Place Order</button>
          </div>
        </div>
      </div>
    </div>
   </PageTransition>
  );
}

export default Cart;
