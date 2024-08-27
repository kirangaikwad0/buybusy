import React from "react";
import { useProductContext } from "../productContext";
import styles from "../styles/Cart.module.css";
import { AiFillMinusCircle } from "react-icons/ai";
import { BsFillPlusCircleFill } from "react-icons/bs";

//CartItem page
export default function CartItem(props) {
  const { name, price, quantity, image, category } = props.product;

  // to icncrease, decrease, remove item from cart
  const { removeFromCart, increaseQuant, decreaseQuant } = useProductContext();
  return (
    <div>
      <div className={styles.cardContainer}>
        <div className={styles.imageContainer}>
          <img src={image} alt={category} />
        </div>

        <div className={styles.iteminfo}>
          <div className={styles.namePrice}>{name}</div>
          <div className={styles.priceQuant}>Rs. {price}</div>

          <div className={styles.quantity}>
            <span className={styles.minus}>
              <AiFillMinusCircle onClick={() => decreaseQuant(props.product)} />
            </span>
            &nbsp; {quantity} &nbsp;
          </div>

          <span className={styles.plus}>
            <BsFillPlusCircleFill
              onClick={() => increaseQuant(props.product)}
            />
          </span>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button
          className={styles.removeBtn}
          onClick={() => removeFromCart(props.product)}
        >
          Remove from cart
        </button>
      </div>
    </div>
  );
}
