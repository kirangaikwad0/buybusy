import React from "react";
import { useProductContext } from "../productContext";
import styles from "../styles/Home.module.css";
import ItemCard from "./ItemCard";

export default function MainContent(props) {
  const { search, price, category, applyFilter } = props;
  const { data } = useProductContext();
  return (
    <div className={styles.itemContainer}>
      {data
        .filter((item) => {
          return search.toLocaleLowerCase() === ""
            ? item
            : item.name.toLocaleLowerCase().includes(search);
        })
        .filter((item) => {
          return !applyFilter ? item : item.price <= price;
        })
        .filter((item) => {
          return !applyFilter || category === "none"
            ? item
            : item.category === category;
        })
        .map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
    </div>
  );
}
