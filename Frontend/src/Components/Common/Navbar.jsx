import * as React from "react";
import { useEffect, useState, useContext } from "react";
// import logo from "../../assets/img/navbar/ST-Logo.jpeg";
// Updated Code
import logo from "../../assets/img/logos/FlightSavior.png";
import nav_1 from "../../assets/img/navbar/nav-1.png";
import nav_2 from "../../assets/img/navbar/nav-2.png";
import nav_3 from "../../assets/img/navbar/nav-3.png";
import Button2 from "./Button2";
import world from "../../assets/img/navbar/tabler_world.png";
import profile from "../../assets/img/profile-temp.png";
import { UserContext } from "../../context/UserContext";
import { Dropdown, Popover, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { CurrencyContext } from "../../context/CurrencyContext";

const Navbar = () => {
  const [user, setUserData, getUserData] = useContext(UserContext);
  const [currency, setCurrency, convert] = useContext(CurrencyContext);
  const navigate = useNavigate();
  const location = useLocation();

  const Currency = () => {
    const [open, setOpen] = useState(false);

    const toggleOpen = (toggle) => {
      setOpen(toggle);
    };

    const changeCurrency = (value) => {
      setCurrency(value);
    };

    return (
      <Popover
        trigger="click"
        open={open}
        onOpenChange={toggleOpen}
        content={
          <div className="flex flex-col text-center py-6 bg-white rounded-lg text-lg font-medium">
            <div className="text-base font-normal mx-2 raleway">
              {/* Select Currency */}
            </div>
            {/* <hr className="mt-2 mb-5 mx-5" /> */}
            <a
              onClick={() => {
                changeCurrency("USD");
              }}
              className="px-7 hover:text-white hover:bg-blue-500 hover:font-bold"
            >
              USD
            </a>
            <a
              onClick={() => {
                changeCurrency("CAD");
              }}
              className="px-7 hover:text-white hover:bg-blue-500 hover:font-bold"
            >
              CAD
            </a>
            <a
              onClick={() => {
                changeCurrency("GBP");
              }}
              className="px-7 hover:text-white hover:bg-blue-500 hover:font-bold"
            >
              GBP
            </a>
            <a
              onClick={() => {
                changeCurrency("EUR");
              }}
              className="px-7 hover:text-white hover:bg-blue-500 hover:font-bold"
            >
              EUR
            </a>
          </div>
        }
      >
        <div href="" className="flex gap-1 font-semibold cursor-pointer">
          <img src={world} alt="" />
          {currency}
        </div>
      </Popover>
    );
  };

  const items = [
    {
      label: <Link to="/user">Profile</Link>,
      key: "0",
    },
    localStorage.getItem("admin") && {
      label: <Link to="/admin-settings">Settings</Link>,
      key: "1",
    },
    {
      label: (
        <>
          <hr />
          <a
            className="font-bold"
            rel="noopener noreferrer"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setUserData();
              localStorage.removeItem("admin");
              localStorage.removeItem("email");
              if (location.pathname.includes("/user")) {
                navigate("/");
              } else navigate(location.pathname);
            }}
          >
            Log Out
          </a>
        </>
      ),
      key: "2",
    },
  ];

  const linkList = [
    {
      img: nav_1,
      title: "flight",
      url: "flight",
    },
    {
      img: nav_2,
      title: "hotel",
      url: "hotel",
    },
    {
      img: nav_3,
      title: "car-rental",
      url: "car-rental",
    },
  ];
  return (
    <nav className="p-2 md:p-5 flex items-center justify-between break-normal shadow-lg">
      <Link to="/" className="pb-2 px-2 basis-44 flex-shrink-[2]">
        <img src={logo} alt="" className="object-contain inline" />
      </Link>
      <div className="nav-buttons flex flex-row justify-end gap-8 items-center flex-grow">
        <Currency />
        {user ? (
          <Dropdown
            menu={{
              items,
            }}
            className="cursor-pointer"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {localStorage.getItem("admin") ? <>Admin</> : <>User</>}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <>
            {/* <Link to="login" className="font-semibold text-sm">
              Login
            </Link> */}
            <Button
              variant="contained"
              className="quicksand"
              // bg="var(--primary-500)"
              sx={{
                backgroundColor: "var(--primary-500)",
                fontSize: 12,
                padding: 1,
              }}
              onClick={() => navigate("login")}
            >
              Login
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
