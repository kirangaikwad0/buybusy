import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthValue } from "../authContext";

//Navbar page
export default function Navbar() {
  const { isLoggedIn, signOut } = useAuthValue();
  // const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <div className={styles.navbarContainer}>
        <div className={styles.appName}>
          <NavLink to="/">
            <i class="fa-solid fa-shop"></i>
            BusyBuy
          </NavLink>
        </div>

        <div className={styles.navLinks}>
          <NavLink to="/">
            <span>
              <i class="fa-solid fa-house"></i>
              Home
            </span>
          </NavLink>

          {isLoggedIn && (
            <NavLink to="/myorder">
              <span>
                <i class="fa-solid fa-bag-shopping"></i>
                My Order
              </span>
            </NavLink>
          )}

          {isLoggedIn && (
            <NavLink to="/cart">
              <span>
                <i class="fa-shard fa-solid fa-cart-shopping"></i>
                Cart
              </span>
            </NavLink>
          )}

          <NavLink to={!isLoggedIn ? "/signin" : "/"}>
            <span>
              {!isLoggedIn ? (
                <>
                  <i class="fa-solid fa-right-to-bracket"></i>
                  SignIn
                </>
              ) : (
                <>
                  <i class="fa-solid fa-right-to-bracket"></i>

                  <span onClick={signOut}> SignOut</span>
                </>
              )}
            </span>
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
