import { baseModule } from "./config";

const APIS = {
  // All Flight APIs
  listOffers: (body) => {
    return baseModule.post("flights/", body);
  },
  createPaymentIntent: (body) => {
    return baseModule.post("flights/payment", body);
  },
  confirmPayment: (body) => {
    return baseModule.post("flights/confirm", body);
  },
  cities: (body) => {
    return baseModule.post("flights/cities", body);
  },
  createOrder: ({ body = {}, headers = undefined }) => {
    return baseModule.post("flights/order", body, { headers: headers });
  },
  offerData: (body) => {
    return baseModule.post("flights/getOffer", body);
  },
  // All Hotel APIs
  fetchHotels: (body) => {
    return baseModule.post("hotels", body);
  },
  hotelSearch: (body) => {
    return baseModule.post("hotels/hotelplaces", body);
  },
  hotelRates: (body) => {
    return baseModule.post("hotels/rates", body);
  },
  hotelQuote: (body) => {
    return baseModule.post("hotels/quote", body);
  },
  hotelPayment: (body) => {
    return baseModule.post("hotels/hotelPaymentIntent", body);
  },
  createHotelBooking: ({ body = {}, headers = undefined }) => {
    return baseModule.post("hotels/createBooking", body, { headers: headers });
  },
  // User Auth APIs
  register: (body) => {
    return baseModule.post("user/register", body);
  },
  login: (body) => {
    return baseModule.post("user/login", body);
  },
  // Registered User Data APIs
  getUserData: (token) => {
    return baseModule.get("user/getuser", {
      headers: {
        "X-Auth-Token": token,
      },
    });
  },
  deleteUserData: (token) => {
    return baseModule.delete("user/deleteaccount", {
      headers: {
        "X-Auth-Token": token,
      },
    });
  },
  changeUserData: (req) => {
    return baseModule.patch("user/updateuser", req.body, {
      headers: {
        "X-Auth-Token": req.token,
      },
    });
  },
  getUserFlightData: (token) => {
    return baseModule.get("user/userflightdata", {
      headers: {
        "X-Auth-Token": token,
      },
    });
  },
  // Admin Action APIs
  getAllUsers: (token) => {
    return baseModule.get("user/allusers", {
      headers: {
        "X-auth-token": token,
      },
    });
  },
  deleteUser: (req) => {
    return baseModule.delete(`user/deleteuser`, {
      headers: {
        "X-Auth-Token": req.token,
      },
      data: { id: req.id },
    });
  },
  getAllFlightData: (token) => {
    return baseModule.get("user/alluserflightdata", {
      headers: {
        "X-Auth-Token": token,
      },
    });
  },
  getAllHotelData: (token) => {
    return baseModule.get("user/alluserhoteldata", {
      headers: {
        "X-Auth-Token": token,
      },
    });
  },
  getMarkup: (token) => {
    return baseModule.get("user/getmarkup", {
      headers: { "X-Auth-Token": token },
    });
  },
  updateMarkup: (req) => {
    return baseModule.put("user/updatemarkup", req.body, {
      headers: {
        "X-Auth-Token": req.token,
      },
    });
  },
  fetchContent: () => {
    return baseModule.get("content");
  },
  postContent: (req) => {
    const { body, token } = req;
    return baseModule.post("content/addContent", body, {
      headers: {
        "X-Auth-Token": token,
      },
    });
  },
};

export default APIS;
