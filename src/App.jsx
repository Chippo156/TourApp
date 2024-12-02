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
import Deserve from "./page/Deserve/hotelBooking";
import UserDetails from "./page/UserInformation";
import TourDetails from "./page/TourDetails";
import BookingHistory from "./page/BookingHistory";
import { useDispatch, useSelector } from "react-redux";
import { reloadUser } from "./controller/loginController";
import { useEffect } from "react";
import { login, logout } from "./redux/UserSlice";
import FilterTour from "./page/FilterTour";
import TourBooking from "./page/Deserve/tourBooking";
import ResetWithEmail from "./page/Forgot";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleGetUser = async () => {
    let res = await reloadUser(localStorage.getItem("token"));
    if (res && res.code === 200) {
      dispatch(login(res.result));
    }
  };
  useEffect(() => {
    handleGetUser();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutUser />,
      // element: <Login />,
      errorElement: <Error />,
      children: [
        { index: false, path: "/", element: <Home /> },
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
          path: "/tour-details/:id",
          element: <TourDetails />,
        },
        {
          index: true,
          path: "/profile",
          element: <UserDetails />,
        },
        {
          index: true,
          path: "/forgot",
          element: <ResetWithEmail />,
        },

        {
          index: true,
          path: "/bookingTour",
          element: <TourBooking />,
        },
        {
          index: true,
          path: "/booking-history",
          element: <Register />,
        },
        {
          index: true,
          path: "/login",
          element: <Login />,
        },
        {
          index: true,
          path: "/register",
          element: <Register />,
        },
        {
          index: true,
          path: "/filterTour",
          element: <FilterTour />,
        },
        {
          index: true,
          path: "/historyBooking",
          element: <BookingHistory />,
        },

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
    // {
    //   path: "/tour-details",
    //   element: <TourDetails />
    // },
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
