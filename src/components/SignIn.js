import React, { useRef } from "react";
import styles from "../styles/SignIn.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthValue } from "../authContext";

//Sign In page
export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const { signIn } = useAuthValue();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(data);
    const status = await signIn(data);
    {
      status ? navigate("/") : navigate("/signin");
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.inputForm}>
        <h1>SignIn</h1>

        <form action="  " onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            required
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="Enter password"
            required
            ref={passwordRef}
          />

          <button>Sign In</button>
        </form>
        <br />

        <span>Or &nbsp;</span>
        <NavLink to="/signup">SignUp instead</NavLink>
      </div>
    </div>
  );
}
