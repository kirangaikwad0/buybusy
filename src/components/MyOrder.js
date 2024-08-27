import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useProductContext } from "../productContext";
import styles from "../styles/order.module.css";
import { Link } from "react-router-dom";
import OrderDetail from "./OrderDetail";

//My order page
export default function MyOrder() {
  const [isLoading, setLoading] = useState(true);
  const { myOrders } = useProductContext();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    });
  }, 300);
  return (
    <div>
      {isLoading ? (
        <loader />
      ) : (
        <div>
          <h1 className={styles.orderHeading}>My Orders</h1>

          {myOrders.length === 0 ? (
            <>
              <h1>You haven't placed any order yet!</h1>

              <Link to="/">Start Shopping</Link>
            </>
          ) : (
            <div className={styles.orderListContainer}>
              {myOrders.map((order, i) => (
                <OrderDetail key={i} order={order} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
