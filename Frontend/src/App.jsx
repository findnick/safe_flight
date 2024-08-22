import { useEffect, createContext, useContext } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import CarRental from "./Pages/CarRental";
import Flight from "./Pages/Flight";
import Hotel from "./Pages/Hotel";
import Landing from "./Pages/Landing";
import Accounts from "./Pages/Accounts";
import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";
import {
  Search,
  SearchFlight,
  SearchHotel,
  SearchCarRental,
} from "./Pages/Search";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout";
import {
  ToS,
  Privacy,
  Security,
  Help,
  Safety,
  Cancellation,
  Complaint,
  ContactUs,
  FAQ,
  AboutUs,
  Airlines,
} from "./Pages/Footer_Links";
import PassengerInformation from "./Pages/PassengerInformation";
import SignUp from "./Pages/Signup";
import IndexRoutes from "./routes/IndexRoutes";
import Layout from "./layout/Layout";
import { UserContext } from "./context/UserContext";
import UserInfo from "./Pages/UserInfo";
import BookingsInfo from "./Pages/BookingsInfo";
import AdminUsers from "./Pages/AdminUsers";
import AdminBookings from "./Pages/AdminBookings";
import { HotelProvider } from "./context/HoteContext";
import Checkout_temp from "./Pages/checkout_temp/Checkout_temp";
import CheckoutRender from "./Pages/CheckoutRender/CheckoutRender";
import AdminSettings from "./Pages/AdminSettings";
import AddMarkup from "./Pages/AddMarkup";
import {
  EditPrivacy,
  EditCancellation,
  EditContact,
  EditAbout,
} from "./Pages/Editor/EditorChanges";

const footer_pages = [
  {
    path: "/terms-of-service",
    element: <ToS />,
  },
  {
    path: "/privacy-policy",
    element: <Privacy />,
  },
  {
    path: "/security-policy",
    element: <Security />,
  },
  {
    path: "/help-center",
    element: <Help />,
  },
  {
    path: "/safety-information",
    element: <Safety />,
  },
  {
    path: "/cancellation",
    element: <Cancellation />,
  },
  {
    path: "/report-complaint",
    element: <Complaint />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/faqs",
    element: <FAQ />,
  },
  {
    path: "/airline-information",
    element: <Airlines />,
  },
];

// const router = createBrowserRouter(routes);

const App = () => {
  const [user, , getUserData] = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route
            path="checkout_/"
            element={<CheckoutRender />}
          /> */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Flight />} />
            <Route path="checkout_/" element={<CheckoutRender />} />
            <Route path="flight" element={<Flight />} />
            <Route path="hotel" element={<Hotel />} />
            <Route path="car-rental" element={<CarRental />} />
            <Route path="search/">
              <Route
                path="flight"
                element={<Search component={<SearchFlight />} />}
              />
              <Route
                path="hotels"
                element={<Search component={<SearchHotel />} />}
              />
              <Route
                path="car-rentals"
                element={<Search component={<SearchCarRental />} />}
              />
            </Route>

            <Route
              path="checkout/:client_token/:pit/:offer_id"
              element={<Checkout />}
            />
            {user ? (
              <>
                <Route path="user/" element={<Accounts />}>
                  <Route
                    index
                    element={
                      localStorage.getItem("admin") ? (
                        <AdminUsers />
                      ) : (
                        <UserInfo />
                      )
                    }
                  />
                  <Route
                    path="bookings"
                    element={
                      localStorage.getItem("admin") ? (
                        <AdminBookings />
                      ) : (
                        <BookingsInfo />
                      )
                    }
                  />
                </Route>
                {localStorage.getItem("admin") && (
                  <Route path="admin-settings/" element={<AdminSettings />}>
                    <Route path="add-markup" element={<AddMarkup />} />
                    <Route
                      path="edit-privacy-policy"
                      element={<EditPrivacy />}
                    />
                    <Route
                      path="edit-cancellation-policy"
                      element={<EditCancellation />}
                    />
                    <Route path="edit-contact-us" element={<EditContact />} />
                    <Route path="edit-about-us" element={<EditAbout />} />
                  </Route>
                )}
              </>
            ) : (
              <>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
              </>
            )}
            {footer_pages.map((pages, i) => {
              return <Route path={pages.path} element={pages.element} />;
            })}
            <Route
              path="*"
              element={
                <div className="my-20 text-center font-light text-6xl">
                  404 <br /> Not Found
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
