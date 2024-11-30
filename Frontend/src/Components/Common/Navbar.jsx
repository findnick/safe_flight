import * as React from "react";
import { useEffect, useState, useContext } from "react";
// import logo from "../../assets/img/navbar/ST-Logo.jpeg";
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
import { HiOutlineUserCircle } from "react-icons/hi";
import { Button } from "@mui/material";
import { CurrencyContext } from "../../context/CurrencyContext";
import { FaAngleDown } from "react-icons/fa";

const Navbar = () => {
  const [user, setUserData, getUserData] = useContext(UserContext);
  const [currency, setCurrency, convert, allCurrencies] =
    useContext(CurrencyContext);
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
            <div className="text-base font-normal mx-2 raleway"></div>
            {allCurrencies.map((value, i) => {
              return (
                <a
                  onClick={() => {
                    changeCurrency(value);
                  }}
                  key={i}
                  className="px-7 hover:text-white hover:bg-blue-500 hover:font-bold"
                >
                  {value}
                </a>
              );
            })}
            {/* <a
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
            </a> */}
          </div>
        }
      >
        <div
          href=""
          className="flex gap-1 font-semibold quicksand cursor-pointer"
        >
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
              if (location.pathname.includes("user")) {
                navigate("/");
              }
            }}
          >
            Log Out
          </a>
        </>
      ),
      key: "2",
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
            className="cursor-pointer flex"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {/* {localStorage.getItem("admin") ? <>Admin</> : <>User</>} */}
                <HiOutlineUserCircle size={25} />
                {/* <DownOutlined size={"12px"} /> */}
                <FaAngleDown className="font-thin" />
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
                fontSize: "13px",
                padding: "4px",
                fontWeight: 600,
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
