import React, { useRef } from "react";
import styles from "../styles/SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../authContext";

//Sign up page
export default function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { createUser } = useAuthValue();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    createUser(data);
    navigate("/signin");
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputForm}>
        <h1>SignUp</h1>

        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Name" required ref={nameRef} />
          <input
            type="email"
            placeholder="Enter Email"
            required
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="Enter Password"
            required
            ref={passwordRef}
          />

          <button>SignUp</button>
        </form>
      </div>
    </div>
  );
}

// import React, { useRef } from "react";
// import styles from "../styles/SignIn.module.css";
// import { useNavigate } from "react-router-dom";
// import { useAuthValue } from "../authContext";

// export default function SignUp() {
//   const nameRef = useRef();
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const { createUser } = useAuthValue();
//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const data = {
//       name: nameRef.current.value,
//       email: emailRef.current.value,
//       password: passwordRef.current.value,
//     };

//     try {
//       await createUser(data); // Await the createUser function if it's a promise
//       navigate("/signin");
//     } catch (error) {
//       console.error("Error creating user:", error);
//       // Handle the error or provide feedback to the user
//     }
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.inputForm}>
//         <h1>Sign Up</h1> {/* Changed 'SignUp' to 'Sign Up' for consistency */}

//         <form onSubmit={handleSubmit}> {/* Removed unnecessary action attribute */}
//           <input
//             type="text"
//             placeholder="Enter Name"
//             required
//             ref={nameRef}
//           />
//           <input
//             type="email"
//             placeholder="Enter Email"
//             required
//             ref={emailRef}
//           />
//           <input
//             type="password"
//             placeholder="Enter Password"
//             required
//             ref={passwordRef}
//           />

//           <button type="submit">Sign Up</button> {/* Added type="submit" */}
//         </form>
//       </div>
//     </div>
//   );
// }
