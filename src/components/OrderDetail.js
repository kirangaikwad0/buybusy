import React from "react";
import styles from "../styles/order.module.css";



//Order Details page
export default function OrderDetail(props) {
  const { date, list, amount } = props.order;
  return (
    <div>
      <h1 className={styles.orderHeading}>Ordered On:{date}</h1>
      <table>
        <tr>
          <th>Sno</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Amount</th>
        </tr>

        {list.map((product, i) => (
          <tr>
            <td>{i + 1}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>Rs. {product.quantity * product.price}</td>
          </tr>
        ))}

        <tr>
          <td colSpan={4}>Grand Total</td>
          <td>Rs.{amount}</td>
        </tr>
      </table>
    </div>
  );
}
