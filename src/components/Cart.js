import React, { useEffect, useState } from "react";
import { useAuthValue } from "../authContext";
import { useProductContext } from "../productContext";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "../styles/Cart.module.css";
import Loader from "./Loader";
import CartItem from "./CartItem";
import { toast } from "react-toastify";

//cart page
export default function Cart() {
  const [isLoading, setLoading] = useState(true);
  const { cart, total, clearCart, purchaseAll, itemInCart } =
    useProductContext();
  const { userLoggedIn } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  // Eventlistener for purchasing all the item in the cart
  function handlePurchase() {
    if (itemInCart === 0) {
      toast.error("Nothing to purchase in your cart");
      return;
    }
    purchaseAll();
    toast.success("Your cart has been placed");
    navigate("/myorder");
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.header}>
            <div className={styles.userInfo}>
              <h1>
                <small>Your cart has</small>
              </h1>
            </div>
            <div className={styles.cardDetail}>
              <div>
                Item: {itemInCart}
                <br />
                <button onClick={clearCart} className={styles.removeAll}>
                  Remove All
                </button>
              </div>
              <div>
                Total Amount : Rs{total}
                <br />
                <button onClick={handlePurchase} className={styles.purchaseAll}>
                  Purchase All
                </button>
              </div>
            </div>
          </div>
          <div className={styles.itemContainer}>
            {cart.length === 0 ? (
              <h1>Nothing in your cart!!</h1>
            ) : (
              cart.map((product, index) => (
                <CartItem product={product} key={index} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
