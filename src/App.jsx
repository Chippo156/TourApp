import "./App.scss";
import LayoutUser from "./component/LayoutUser/LayoutUser";
import Error from "./component/Error";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutAdmin from "./component/LayoutAdmin/LayoutAdmin";
import TravelDetail from "./page/Details";
import FilterPage from "./page/Destination";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutUser />,
      errorElement: <Error />,
      children: [
        { index: false, path: "/", element: <Home /> },
        // {
        //   index: true,
        //   path: "/travel/:id",
        //   element: <TravelDetail />,
        // },
        // {
        //   index: true,
        //   path: "/deserve",
        //   element: <Deserve />,
        // },
        // { path: "/product/:id", element: <Product /> },
        // { path: "/profile", element: <Profile /> },
        // { path: "/category/:id", element: <CategoryPage /> },
        // { path: "/cart", element: <CartPage /> },
        // { path: "/cartManager", element: <CartManager /> },\
        { path: "/destination/:value", element: <FilterPage /> },
      ],
    },

    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
    },
  ]);

  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
