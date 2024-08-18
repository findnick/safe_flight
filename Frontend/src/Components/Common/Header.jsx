import HeaderText from "./HeaderText";
import tmp from "../../assets/img/form-temp.png";
import { Link, NavLink } from "react-router-dom";

const Header = ({ headingStart, headingEnd, para, img, children }) => {
  return (
    <div
      className="flex flex-col p-6 sm:p-20 gap-4"
      style={{
        background: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${img})`,
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
        minHeight: 640,
      }}
    >
      <div className="bg-transparent text-white flex mb-10">
        <div className="inline-nav text-lg font-semibold flex-grow sm:flex-grow-0 sm:mx-auto flex flex-row text-center gap-5 rounded-full">
          <NavLink
            to="/"
            className={({ isActive }) => {
              const def = "basis-28 md:w-28 py-4 rounded-full";
              return isActive ? def + " active-navlink" : def;
            }}
          >
            Flights
          </NavLink>
          <NavLink
            to="/hotel"
            className={({ isActive }) => {
              const def = "basis-28 md:w-28 py-4 rounded-full";
              return isActive ? def + " active-navlink" : def;
            }}
          >
            Hotels
          </NavLink>
          <NavLink
            to="/car-rental"
            className={({ isActive }) => {
              const def = "basis-28 md:w-28 py-4 rounded-full";
              return isActive ? def + " active-navlink" : def;
            }}
          >
            Cars
          </NavLink>
        </div>
      </div>
      <HeaderText>{headingStart}</HeaderText>
      <HeaderText>{headingEnd}</HeaderText>
      <h4 className="font-light text-lg text-white text-center">{para}</h4>
      {children}
      {/* <img src={tmp} alt="" /> */}
    </div>
  );
};

export default Header;
