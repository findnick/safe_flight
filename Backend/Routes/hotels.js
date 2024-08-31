import express from "express";
const routes = express.Router();

import {
  searchLocation,
  searchHotel,
  roomRates,
  createQuote,
  hotelPlaces,
} from "../Controllres/hotels.js";

// 1 Get Hotels

routes.post("/", searchLocation);

routes.post("/hotelplaces", hotelPlaces);

routes.post("/id", searchHotel);

routes.post("/rates", roomRates);

routes.post("/quote", createQuote);

// module.exports = routes

export default routes;
