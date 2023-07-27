import React from "react";
import ReactDom from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./utils/AuthContext";
import { Provider } from "react-redux";
import Store from "./utils/store";
import Cart from "./components/Cart";
import AdminPortal from "./components/AdminPortal";

const AppLayout = () => {
  return (
    <>
      <Provider store={Store} >
        <AuthProvider>
          <Header />
          <Outlet />
          <Footer />
        </AuthProvider>
      </Provider>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/cart", element: <Cart /> },
      { path: "/admin", element: <AdminPortal /> },
    ],
  },
]);

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
