import "react-toastify/dist/ReactToastify.css";
import { useAuthValue } from "./authContext";
import {
  Children,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import { collection, addDoc, onSnapshot, doc } from "firebase/firestore";
import { db } from "./firebaseInit";
import { toast, ToastContainer } from "react-toastify";
import { data } from "./Assets/Data";
import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";

export const productContext = createContext();

export function useProductContext() {
  const value = useContext(productContext);
  return value;
}

export function ProductContext({ children }) {
  const { isLoggedIn, setUserLoggedIn, setLoggedIn, userLoggedIn } =
    useAuthValue();
  const [itemInCart, setItemInCart] = useState(0);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const index = window.localStorage.getItem("index");
      const user = JSON.parse(index);
      // isLoggedIn(token);
      setUserLoggedIn(user);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const unsub = onSnapshot(doc(db, "BusyBuy", userLoggedIn.id), (doc) => {
        setCart(doc.data().cart);
        setMyOrders(doc.data().orders);
      });
      let sum = 0;
      cart.map((item) => Number((sum += item.price)));
      setTotal(sum);
      setItemInCart(cart.length);
    }
  }, [userLoggedIn]);

  // Add item to the cart
  async function addToCart(product) {
    if (!isLoggedIn) {
      toast.error("please first login");
      return;
    }

    const index = cart.findIndex((item) => item.name === product.name);
    if (index !== -1) {
      increaseQuant(cart[index]);
      return;
    }
    const userRef = doc(db, "BusyBuy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: arrayUnion({ quantity: 1, ...product }),
    });
    setTotal(Number(total + product.price));
    setItemInCart(itemInCart + 1);
    toast.success("added to cart");
  }

  // to increase the item in the cart
  async function increaseQuant(product) {
    const index = cart.findIndex((item) => item.name === product.name);
    cart[index].quantity++;
    setCart(cart);
    const userRef = doc(db, "BusyBuy", userLoggedIn.id);
    await updateDoc(userRef, { cart: cart });
    setItemInCart(itemInCart + 1);
    setTotal(Number(total + cart[index].price));
  }

  // to decrease the item in the cart
  async function decreaseQuant(product) {
    const index = cart.findIndex((item) => item.name === product.name);
    setTotal(Number(total - cart[index].price));

    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
    setCart(cart);
    setItemInCart(itemInCart - 1);

    const userRef = doc(db, "BusyBuy ", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: cart,
    });
  }

  // to remove the item in the cart
  async function removeFromCart(product) {
    const userRef = doc(db, "BusyBuy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: arrayRemove(product),
    });
    setTotal(Number(total - product.quantity * product.price));
    setItemInCart(itemInCart - product.quantity);
    toast.success("Removed from cart");
  }

  // to empty the items in the cart
  async function clearCart() {
    if (itemInCart === 0) {
      toast.error("nothing to remove in cart!!");
      return;
    }

    const userRef = doc(db, "BusyBuy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: [],
    });
    setTotal(0);
    setItemInCart(0);
    toast.success("Empty cart!!");
  }

  // to purchase all the items in the cart
  async function purchaseAll() {
    const currentDate = getDate();
    const userRef = doc(db, "BusyBuy", userLoggedIn.id);
    await updateDoc(userRef, {
      orders: arrayUnion({ date: currentDate, list: cart, amount: total }),
    });
    clearCart();
  }

  // to get the current date for showing in order details
  function getDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  return (
    <productContext.Provider
      value={{
        data,
        addToCart,
        cart,
        total,
        setTotal,
        removeFromCart,
        clearCart,
        purchaseAll,
        increaseQuant,
        decreaseQuant,
        itemInCart,
        myOrders,
      }}
    >
      {children}
    </productContext.Provider>
  );
}
