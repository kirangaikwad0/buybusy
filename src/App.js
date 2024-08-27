// // import logo from "./logo.svg";
// import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Navbar from "./components/NavBar";
// import SignIn from "./components/SignIn";
// import SignUp from "./components/SignUp";
// import { AuthContext } from "./authContext";
// import { ProductContext } from "./productContext";
// import Home from "./components/Home";
// import MyOrder from "./components/MyOrder";
// import Cart from "./components/Cart";
// import Error from "./components/Error";
// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Navbar />,
//       errorElement: <Error />,
//       children: [
//         { path: "/signin", element: <SignIn /> },
//         { path: "/signup", element: <SignUp /> },
//         { path: "/", element: <Home /> },
//         { path: "/myorder", element: <MyOrder /> },
//         { path: "/cart", element: <Cart /> },
//       ],
//     },
//   ]);
//   return (
//     <>
//       <AuthContext>
//         <ProductContext>
//           <RouterProvider router={router} />
//         </ProductContext>
//       </AuthContext>
//     </>
//   );
// }

// export default App;

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/NavBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AuthContext } from "./authContext";
import { ProductContext } from "./productContext";
import Home from "./components/Home";
import MyOrder from "./components/MyOrder";
import Cart from "./components/Cart";
import Error from "./components/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/myorder", element: <MyOrder /> },
        { path: "/cart", element: <Cart /> },
      ],
    },
  ]);

  return (
    <AuthContext>
      <ProductContext>
        <RouterProvider router={router} />
      </ProductContext>
    </AuthContext>
  );
}

export default App;
