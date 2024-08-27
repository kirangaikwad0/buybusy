import React from "react";
import styles from "../styles/Home.module.css";



//Filter bar page
export default function FilterBar(props) {
  const { price, setPrice, setCategory } = props;
  return (
    <div className={styles.filterBar}>
      <h1>FilterBar</h1>

      <div className={styles.priceRange}>
        <span>Price</span> {`<=${price}`}
        <input
          type="range"
          min="100"
          max="50000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className={styles.categoryBox}>
        <span>Category</span>
      </div>
      <div>
        <input
          type="radio"
          id="men"
          name="category"
          onClick={() => setCategory("men")}
        />
        <label for="men">Men</label>
        <input
          type="radio"
          id="women"
          name="category"
          onClick={() => setCategory("women")}
        />
        <label for="women">women</label>
        <input
          type="radio"
          id="electric"
          name="category"
          onClick={() => setCategory("electric")}
        />
        <label for="electric">electric</label>
        <input
          type="radio"
          id="jewellary"
          name="category"
          onClick={() => setCategory("jewellary")}
        />
        <label for="jewellary">jewellary</label>
        <input
          type="radio"
          id="none"
          name="category"
          onClick={() => setCategory("none")}
        />
        <label for="none">none</label>
      </div>
    </div>
  );
}
