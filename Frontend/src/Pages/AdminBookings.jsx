import { Avatar, Button } from "antd";
import moment from "moment";
import { useState } from "react";
import { FaMoneyBill, FaUser, FaClock, FaDoorOpen } from "react-icons/fa";
import { GoDash } from "react-icons/go";

export default function AdminBookings() {
  const [activeBook, setActiveBook] = useState(["user-tab-active", "", ""]);
  const [activeBookTab, setActiveBookTab] = useState([
    "block",
    "hidden",
    "hidden",
  ]);
  const changeActive = (i) => {
    const tabTemp = ["", "", ""];
    tabTemp[i] = "user-tab-active";
    const contentTemp = ["hidden", "hidden", "hidden"];
    contentTemp[i] = "block";
    setActiveBook(tabTemp);
    setActiveBookTab(contentTemp);
  };
  return (
    <>
      <div className="text-2xl font-bold">Users Booking List</div>
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex flex-row pr-3 pt-5 pl-5 bg-white rounded-lg shadow-md font-bold justify-evenly">
          <div
            className={`booking-tab pl-2 pb-3 transition ease-in hover:border-b-4 hover:border-gray-400 cursor-pointer flex-grow-[2] ${activeBook[0]}`}
            onClick={() => changeActive(0)}
          >
            Flights
          </div>
          <div className="vl mx-4 pb-3"></div>
          <div
            className={`booking-tab pl-2 pb-3 transition ease-in hover:border-b-4 hover:border-gray-400 cursor-pointer flex-grow-[2] ${activeBook[1]}`}
            onClick={() => changeActive(1)}
          >
            Hotels
          </div>
          <div className="vl mx-4"></div>
          <div
            className={`booking-tab pl-2 pb-3 transition ease-in hover:border-b-4 hover:border-gray-400 cursor-pointer flex-grow-[2] ${activeBook[2]}`}
            onClick={() => changeActive(2)}
          >
            Car Rentals
          </div>
        </div>
      </div>
      <div className={`${activeBookTab[0]}`}>
        <div className="flex flex-row items-center justify-between flex-wrap bg-white rounded-lg shadow-md p-3">
          <div className="flex flex-row items-center gap-4">
            <div className="lg:p-3 lg:m-6 lg:flex-shrink-0 border border-gray-200 rounded-lg">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdK6WoVNm8_fi5IGy60Zn0nStftwFN8A4mpF1Z7ZP6uNaogDtz84xOntrGkUWJ5zKYO7c&usqp=CAU"
                alt=""
                className="object-contain"
                style={{ width: "5rem" }}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center">
                <div className="text-xl text-100">Newark (EWR)</div>
                <div className="px-3">
                  <GoDash size={25} />
                </div>
                <div className="text-xl text-100">Nashville (BNA)</div>
              </div>
              <div className="text-xl font-bold text-center">
                {moment("12-06-24", "DD-MM-YY").format("Do MMMM, YYYY")}
              </div>
            </div>
            <div className="vl mx-6" style={{ height: "4rem" }}></div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-5">
              <div className="flex flex-row items-center gap-3">
                <Avatar
                  shape="circle"
                  style={{
                    background: "var(--primary-100)",
                    color: "var(--primary-500)",
                  }}
                  size="large"
                >
                  <FaUser size={25} />
                </Avatar>
                <div className="flex flex-col">
                  <div className="text-sm font-bold text-100">Email</div>
                  <div className="text-base font-bold">john.doe@gmail.com</div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <Avatar
                  shape="circle"
                  style={{
                    background: "var(--primary-100)",
                    color: "var(--primary-500)",
                  }}
                  size="large"
                >
                  <FaMoneyBill size={25} />
                </Avatar>
                <div className="flex flex-col">
                  <div className="text-sm font-bold text-100">Amount</div>
                  <div className="text-base font-bold">
                    532.90 <span className="primary-500">GBP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" ml-2 mr-4 mb-2 lg:mb-0 self-stretch lg:self-center">
            <Button
              type="primary"
              htmlType="button"
              className="h-12 font-bold"
              block
            >
              Resend Ticket
            </Button>
          </div>
        </div>
      </div>
      <div className={`${activeBookTab[1]}`}>
        <div className="flex flex-row items-center justify-between bg-white rounded-lg shadow-md">
          <div className="flex flex-row items-center gap-4">
            <div className="lg:p-3 lg:m-6 lg:flex-shrink-0 border border-gray-200 rounded-lg">
              <img
                src="https://marketplace.canva.com/EAE0d_FW6ZA/1/0/1600w/canva-retro-vector-gold-frames-luxury-decorative-logo-template-uDFt-cAE2ug.jpg"
                alt=""
                className="object-contain"
                style={{ width: "5rem", height: "5rem" }}
              />
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-col">
                <div className="text-xl text-100">Check-in</div>
                <div className="text-xl font-bold">August 6, 2024</div>
              </div>
              <div className="px-3">
                <GoDash size={25} />
              </div>
              <div className="flex flex-col">
                <div className="text-xl text-100">Check-out</div>
                <div className="text-xl font-bold">August 13, 2024</div>
              </div>
            </div>
            <div className="vl mx-6" style={{ height: "4rem" }}></div>
            <div className="flex flex-row items-start gap-5">
              <div className="flex flex-row items-center gap-2">
                <Avatar
                  shape="square"
                  style={{
                    background: "var(--primary-100)",
                    color: "var(--primary-500)",
                  }}
                  size="large"
                >
                  <FaClock size={25} />
                </Avatar>
                <div className="flex flex-col">
                  <div className="text-sm font-bold text-100">
                    Check-in Time
                  </div>
                  <div className="text-base font-bold">12:30pm</div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Avatar
                  shape="square"
                  style={{
                    background: "var(--primary-100)",
                    color: "var(--primary-500)",
                  }}
                  size="large"
                >
                  <FaClock size={25} />
                </Avatar>
                <div className="flex flex-col">
                  <div className="text-sm font-bold text-100">
                    Check-out Time
                  </div>
                  <div className="text-base font-bold">11:30pm</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mr-4">
            <Button type="primary" htmlType="button" className="h-12 font-bold">
              Resend Confirmation
            </Button>
          </div>
        </div>
      </div>
      <div className={`${activeBookTab[2]}`}>cars</div>
    </>
  );
}
