import { useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CarRental from "./Pages/CarRental";
import Flight from "./Pages/Flight";
import Hotel from "./Pages/Hotel";
import Accounts from "./Pages/Accounts";
import {
  Search,
  SearchFlight,
  SearchHotel,
  SearchCarRental,
} from "./Pages/Search";
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
import SignUp from "./Pages/Signup";
import Layout from "./layout/Layout";
import { UserContext } from "./context/UserContext";
import UserInfo from "./Pages/UserInfo";
import BookingsInfo from "./Pages/BookingsInfo";
import AdminUsers from "./Pages/AdminUsers";
import AdminBookings from "./Pages/AdminBookings";
import CheckoutRender from "./Pages/CheckoutRender/CheckoutRender";
import AdminSettings from "./Pages/AdminSettings";
import AddMarkup from "./Pages/AddMarkup";
import {
  EditPrivacy,
  EditCancellation,
  EditContact,
  EditAbout,
  EditHome,
  EditCampaign,
} from "./Pages/Editor/EditorChanges";
import AddHotelMarkup from "./Pages/AddHotelMarkup";
import EditCampaignBackground from "./Pages/EditCampaignBackground";
import { APIS, useAPI } from "./api/config";
import moment from "moment";
import { currencies } from "./hooks/useCurrency";

const App = () => {
  const [user, setUser, getUserData] = useContext(UserContext);
  const [getUser, userLoading] = useAPI(APIS.getUserData);

  const { VITE_FIXER_KEY } = import.meta.env;

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

  const redirect = (res) => {
    Swal.fire(res.response.data.msg, "", "error");
    setUser();
  };

  useEffect(() => {
    if (user?.data) {
      const { token } = user.data;
      getUser(token)
        .then((res) => res?.data || redirect(res))
        .catch((res) => console.error(res));
    }

    let latestCurrencyRates = true;
    if (localStorage.getItem("Currency Rates")) {
      const { timestamp } = JSON.parse(localStorage.getItem("Currency Rates"));
      const dateDiff = Math.abs(
        moment(timestamp).diff(moment().unix(), "hours")
      );
      if (dateDiff > 24) {
        latestCurrencyRates = false;
      } else {
        latestCurrencyRates = true;
      }
    } else {
      latestCurrencyRates = false;
    }

    if (!latestCurrencyRates) {
      axios
        .get(
          `http://data.fixer.io/api/latest?access_key=${VITE_FIXER_KEY}&symbols=${currencies.join(
            ","
          )}`
        )
        .then((res) => {
          if (res.status === 200) {
            const today = moment().unix();
            var currencyObject = { ...res.data };
            currencyObject.timestamp = today;
            localStorage.setItem(
              "Currency Rates",
              JSON.stringify(currencyObject)
            );
          }
        });
    }
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
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
                    <Route
                      index
                      element={<p>You can configure your settings here</p>}
                    />
                    <Route path="add-markup" element={<AddMarkup />} />
                    <Route
                      path="add-hotel-markup"
                      element={<AddHotelMarkup />}
                    />
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
                    <Route path="edit-home-section" element={<EditHome />} />
                    <Route
                      path="edit-campaign-section"
                      element={<EditCampaign />}
                    />
                    <Route
                      path="edit-campaign-background"
                      element={<EditCampaignBackground />}
                    />
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
