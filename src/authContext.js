import { createContext, useEffect, useState, useContext } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseInit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const authContext = createContext();

export function useAuthValue() {
  const value = useContext(authContext);
  return value;
}

export function AuthContext({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);

  //who is the user
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  //List of users
  const [userList, SetUserList] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "BusyBuy"), (snapshot) => {
      const users = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      SetUserList(users);
    });
  }, [isLoggedIn]);


  // to Create a new user
  async function createUser(data) {
    const index = userList.findIndex((user) => user.email === data.email);

    if (index !== -1) {
      toast.error("Email already Exist");
      return;
    }

    const docRef = await addDoc(collection(db, "BusyBuy"), {
      name: data.name,
      email: data.email,
      password: data.password,
      cart: [],
      orders: [],
    });
    toast.success("New user created");
  }


  // for sign in 
  async function signIn(data) {
    const index = userList.findIndex((user) => user.email === data.email);
    if (index === -1) {
      toast.error("Email address does not exist , Singup Instead");
      return;
    }

    if (userList[index].password === data.password) {
      toast.success("SignIn successful");
      setLoggedIn(true);
      setUserLoggedIn(userList[index]);

      window.localStorage.setItem("token", true);
      window.localStorage.setItem("index", JSON.stringify(userList[index]));
      return true;
    } else {
      toast.error("Wrong password , try again");
      return false;
    }
  }

  //for Sign out 
  async function signOut() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("index");
    setLoggedIn(false);
    setUserLoggedIn(null);
    toast.success("sign out successful");
  }

  return (
    <>
      <authContext.Provider
        value={{
          createUser,
          signIn,
          signOut,
          isLoggedIn,
          setLoggedIn,
          setUserLoggedIn,
          userLoggedIn,
        }}
      >
        <ToastContainer />
        {children}
      </authContext.Provider>
    </>
  );
}
