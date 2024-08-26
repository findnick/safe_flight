import { baseModule } from "./config";

const APIS = {
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
  createOrder: (body) => {
    return baseModule.post("flights/order", body);
  },
  offerData: (body) => {
    return baseModule.post("flights/getOffer", body);
  },
  register: (body) => {
    return baseModule.post("user/register", body);
  },
  login: (body) => {
    return baseModule.post("user/login", body);
  },
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
  fetchHotels: (body) => {
    return baseModule.post("hotels", body);
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
