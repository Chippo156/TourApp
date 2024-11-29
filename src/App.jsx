import "./App.scss";
import LayoutUser from "./component/LayoutUser/LayoutUser";
import Error from "./component/Error";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutAdmin from "./component/LayoutAdmin/LayoutAdmin";
import FilterPage from "./page/Destination";
import TravelDetail from "./page/Hotel_Details";
import Deserve from "./page/Deserve";
import UserDetails from "./page/UserInformation";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutUser />,
      errorElement: <Error />,
      children: [
        { index: false, path: "/", element: <TravelDetail /> },
        {
          index: true,
          path: "/destination/:id",
          element: <TravelDetail />,
        },
        {
          index: true,
          path: "/deserveHotel",
          element: <Deserve />,
        },
        {
          index: true,
          path: "/user",
          element: <UserDetails />,
        },
        // { path: "/product/:id", element: <Product /> },
        // { path: "/profile", element: <Profile /> },
        // { path: "/category/:id", element: <CategoryPage /> },
        // { path: "/cart", element: <CartPage /> },
        // { path: "/cartManager", element: <CartManager /> },\
        { path: "/destination/filter/:value", element: <FilterPage /> },
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
      path: "/home",
      element: <Home />,
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