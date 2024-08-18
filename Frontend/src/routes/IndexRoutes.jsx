import { Route } from "react-router-dom";
import Flight from "../Pages/Flight";
import Hotel from "../Pages/Hotel";
import CarRental from "../Pages/CarRental";

export default function IndexRoutes() {
  return (
    <>
      <Route index element={<Flight />} />
      <Route path="flight" element={<Flight />} />
      <Route path="hotel" element={<Hotel />} />
      <Route path="car-rental" element={<CarRental />} />
    </>
  );
}
