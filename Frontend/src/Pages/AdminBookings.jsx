import { Avatar, Button } from "antd";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import { UserContext } from "../context/UserContext";
import { APIS, useAPI } from "../api/config";
import { CircularProgress } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";

export default function AdminBookings() {
  const [user, ,] = useContext(UserContext);
  const { token } = user.data;
  const [getFlightData, flightDataLoading] = useAPI(APIS.getAllFlightData);
  const [getHotelData, hotelDataLoading] = useAPI(APIS.getAllHotelData);
  const [getUser, userLoading] = useAPI(APIS.getSingleUser);
  const [deleteOrder, deleteOrderLoading] = useAPI(APIS.deleteOrderRecord);
  const [flightData, setFlightData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [emails, setEmails] = useState({}); // Store user emails
  const [hotelEmails, setHotelEmails] = useState({});
  const [activeBook, setActiveBook] = useState(["user-tab-active", "", ""]);
  const [activeBookTab, setActiveBookTab] = useState([
    "block",
    "hidden",
    "hidden",
  ]);

  const deleteOrderRecord = async (deleteObject) => {
    try {
      const res = await deleteOrder({ body: deleteObject, token: token });
      return res;
    } catch (err) {
      return err;
    }
  };

  const changeActive = (i) => {
    const tabTemp = ["", "", ""];
    tabTemp[i] = "user-tab-active";
    const contentTemp = ["hidden", "hidden", "hidden"];
    contentTemp[i] = "block";
    setActiveBook(tabTemp);
    setActiveBookTab(contentTemp);
  };

  useEffect(() => {
    getFlightData(token).then((res) => {
      let combinedArray = res.data.guestOrders.concat(res.data.userOrders);
      combinedArray.sort((a, b) => {
        return a.created_at.localeCompare(b.created_at);
      });
      setFlightData(combinedArray);
    });

    getHotelData(token).then((res) => {
      let combinedArray = res.data.guestOrders.concat(res.data.userOrders);
      combinedArray.sort((a, b) => {
        return a.created_at.localeCompare(b.created_at);
      });
      setHotelData(combinedArray);
    });
  }, [deleteOrderLoading]);

  useEffect(() => {
    // Fetch missing emails for flight data
    flightData.forEach((item) => {
      if (!item.email && !emails[item.userId]) {
        getUser({ token: token, id: item.userId }).then((res) => {
          setEmails((prevEmails) => ({
            ...prevEmails,
            [item.userId]: res?.data?.email || "john.doe@gmail.com",
          }));
        });
      }
    });
  }, [flightData]);

  useEffect(() => {
    // Fetch missing emails for flight data
    hotelData.forEach((item) => {
      if (!item.email && !hotelEmails[item.userId]) {
        getUser({ token: token, id: item.userId }).then((res) => {
          setHotelEmails((prevEmails) => ({
            ...prevEmails,
            [item.userId]: res?.data?.email || "john.doe@gmail.com",
          }));
        });
      }
    });
  }, [hotelData]);

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
      <div
        className={`${activeBookTab[0]} flex flex-col justify-center items-stretch gap-8`}
      >
        {flightDataLoading || deleteOrderLoading ? (
          <CircularProgress className="self-center" />
        ) : (
          flightData.length > 0 &&
          flightData.map((item, i) => {
            const data = item?.flightData || item?.orderData;
            // const departure = moment(data.departureTime).format("Do MMM, YY");
            const arrival = moment(data.arrivalTime).format("Do MMM, YY");
            const email =
              item.email || emails[item.userId] || "john.doe@gmail.com";
            const deleteObject = {
              type: item["orderId"] ? "user" : "guest",
              id: item["orderId"] || item["_id"],
            };
            return (
              <div
                key={i}
                className="relative flex flex-row items-center justify-between flex-wrap bg-white rounded-lg shadow-md p-3"
              >
                <div className="absolute right-4 top-4">
                  <button
                    className="bg-red-400 text-white p-1 rounded-lg cursor-pointer hover:bg-red-600 active:bg-red-200"
                    onClick={() => {
                      deleteOrderRecord(deleteObject)
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err));
                      console.log(deleteObject);
                    }}
                  >
                    <MdDeleteForever size={30} />
                  </button>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex justify-center lg:p-3 m-6 lg:flex-shrink-0 md:border border-gray-200 rounded-lg">
                    <img
                      src={data.image}
                      alt=""
                      className="w-1/2 md:w-20 object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row items-center">
                      <div className="text-xl text-100">
                        {data.originCity} ({data.originIataCode})
                      </div>
                      <div className="px-3">
                        <GoDash size={25} />
                      </div>
                      <div className="text-xl text-100">
                        {data.destinationCity} ({data.destinationIataCode})
                      </div>
                    </div>
                    <div className="text-xl font-bold text-center">
                      {arrival}
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
                        <div className="text-base font-bold">{email}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" ml-2 mr-4 mb-2 lg:mb-0 self-stretch lg:self-center">
                  {/* <Button
                    type="primary"
                    htmlType="button"
                    className="h-12 font-bold"
                    block
                  >
                    Resend Ticket
                  </Button> */}
                </div>
              </div>
            );
          })
        )}
      </div>
      <div
        className={`${activeBookTab[1]} flex flex-col justify-center items-stretch gap-8`}
      >
        {hotelDataLoading || deleteOrderLoading ? (
          <CircularProgress className="self-center" />
        ) : (
          hotelData.length > 0 &&
          hotelData.map((item, i) => {
            const data = item?.hotelData || item?.orderData;
            const checkin = moment(data.check_in_date).format("Do MMM, YY");
            const checkout = moment(data.check_out_date).format("Do MMM, YY");
            const email =
              item.email || emails[item.userId] || "john.doe@gmail.com";
            const deleteObject = {
              type: item["orderId"] ? "user" : "guestHotel",
              id: item["orderId"] || item["_id"],
            };
            return (
              <div
                key={i}
                className="relative flex flex-row items-center justify-between bg-white rounded-lg shadow-md"
              >
                <div className="absolute right-4 top-4">
                  <button
                    className="bg-red-400 text-white p-1 rounded-lg cursor-pointer hover:bg-red-600 active:bg-red-200"
                    onClick={() => {
                      deleteOrderRecord(deleteObject)
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err));
                      console.log(deleteObject);
                    }}
                  >
                    <MdDeleteForever size={30} />
                  </button>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div className="lg:p-3 lg:m-6 lg:flex-shrink-0 border border-gray-200 rounded-lg">
                    <img
                      src={data?.accommodation?.photos[0]?.url}
                      alt=""
                      className="object-contain"
                      style={{ width: "5rem", height: "5rem" }}
                    />
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <div className="flex flex-col">
                      <div className="text-xl text-100">Check-in</div>
                      <div className="text-xl font-bold">{checkin}</div>
                    </div>
                    <div className="px-3">
                      <GoDash size={25} />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xl text-100">Check-out</div>
                      <div className="text-xl font-bold">{checkout}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
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
                    <div className="text-base font-bold">{email}</div>
                  </div>
                  <div className=" ml-2 mr-4 mb-2 lg:mb-0 self-stretch lg:self-center">
                    {/* <Button
                      type="primary"
                      htmlType="button"
                      className="h-12 font-bold"
                      block
                    >
                      Resend Ticket
                    </Button> */}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
