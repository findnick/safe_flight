import express from "express";
import admin from "../middlewares/admin.js";
import auth from "../middlewares/auth.js";
const routes = express.Router();
import {
  registerValidationRules,
  validate,
} from "../Utilis/Validations/validations.js";

import {
  register,
  Login,
  getAllUserData,
  getUserData,
  deleteUserData,
  getSpecificUserData,
  updatePersonalInfo,
  deleteAccount,
  userFlightdata,
  allUserFlightdata,
  allUserHoteldata,
  specificOrderData,
  deleteOrder,
} from "../Controllres/user.js";
import { updateMarkup, getMarkup } from "../Controllres/markup.js";

// @POST USER REGISTRATION
// routes.post('/register', register)

routes.post("/register", registerValidationRules(), validate, register);
routes.post("/login", Login);

routes.get("/getuser", auth, getUserData);
routes.patch("/updateuser", auth, updatePersonalInfo);
routes.delete("/deleteaccount", auth, deleteAccount);

// Admin Related Functionalities
routes.post("/finduser", admin, getSpecificUserData);
routes.delete("/deleteuser", admin, deleteUserData);
routes.get("/allusers", admin, getAllUserData);
routes.put("/updatemarkup", admin, updateMarkup);
routes.get("/getmarkup", admin, getMarkup);
routes.get("/userflightdata", auth, userFlightdata);
routes.get("/alluserflightdata", admin, allUserFlightdata);
routes.delete("/deleteorder", admin, deleteOrder);
routes.get("/alluserhoteldata", admin, allUserHoteldata);
routes.get("/specificUserData", admin, specificOrderData);

export default routes;
