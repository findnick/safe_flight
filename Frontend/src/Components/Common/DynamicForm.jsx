import { useEffect, useState } from "react";
import clock from "../../assets/img/dynamic-form/clock.png";
import date from "../../assets/img/dynamic-form/date.png";
import day from "../../assets/img/dynamic-form/day.png";
import location from "../../assets/img/dynamic-form/location.png";
import person from "../../assets/img/dynamic-form/person.png";
import trip from "../../assets/img/dynamic-form/trip.png";
import Button2 from "./Button2";
import { useNavigate } from "react-router-dom";
import DialogBox from "../UnCommon/DialogBox";
import dayjs from "dayjs";
import { Add, Remove } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { DatePicker } from "antd";
import { useAPI, APIS } from "../../api/config";
// import airports from "airport-codes";
// const airports = require("airport-codes");

const { RangePicker } = DatePicker;

const api_token = "duffel_test_yG96C4gRDbs5YAhbRmusaJtx28loboYmlUdeXZnQ2Jj";

function TabContainer({ children }) {
  return (
    <div className="tab-container sm:bg-white sm:rounded-t-2xl">{children}</div>
  );
}

function TabButton({ children, area, onClick }) {
  return (
    <button
      className={"cursor-pointer text-base px-8 py-4 tablinks " + area}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function TabContent({ children, id, display }) {
  return (
    <div
      id={id}
      className="tabcontent sm:bg-white text-black border-transparent sm:border-solid sm:border sm:rounded-tl-none sm:rounded-2xl hidden p-5 w-full"
      style={{ display: display }}
    >
      {children}
    </div>
  );
}

function FormContainer({ children, id }) {
  return (
    <form
      id={id}
      className="form-container flex flex-col sm:flex-row flex-wrap sm:items-center -z-10"
    >
      {children}
    </form>
  );
}

function FormGroup({ children, style = null, className = "" }) {
  return (
    <div
      className={"form-group flex flex-col flex-1 my-3 sm:mx-3 " + className}
      style={style}
    >
      {children}
    </div>
  );
}

function FormGroupLabel({ children, htmlFor = "" }) {
  return (
    <label htmlFor={htmlFor} className="mb-1 flex items-center gap-1">
      {children}
    </label>
  );
}

export function FlightForm({ children }) {
  const [getOffers, loading] = useAPI(APIS.listOffers);
  const [getCities, cityLoading] = useAPI(APIS.cities);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [cabin, setCabin] = useState("economy");
  const today = dayjs();
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState();
  const [adults, setAdults] = useState([{ type: "adult" }]);
  const [child, setChild] = useState([]);
  const [open, setOpen] = useState(false);
  const [fromSuggestionBox, setFromSuggestionBox] = useState("hidden");
  const [toSuggestionBox, setToSuggestionBox] = useState("hidden");

  let data = {
    slices: [
      {
        origin: from,
        destination: to,
        departure_date: fromDate,
      },
    ],
    passengers: [...adults, ...child],
    cabin_class: cabin,
  };

  useEffect(() => {
    console.log(data);
  }, [cabin, from, to, fromDate, toDate, adults, child, isRoundTrip]);

  useEffect(() => {
    console.log(child.length);
  }, [child]);

  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  const showFlights = async () => {
    if (isRoundTrip && data.slices.length < 2)
      data.slices.push({
        origin: to,
        destination: from,
        departure_date: toDate,
      });

    try {
      // const res = await getOffers(data);
      return navigate(`/search/flight/${JSON.stringify(data)}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="form-header flex flex-col-reverse gap-1 sm:gap-0 sm:flex-row justify-between sm:items-center mb-2 sm:mb-0">
        <h3 className="ml-3 mt-4 sm:mt-0">Where are you flying?</h3>
        <div className="trip-options flex flex-col sm:flex-row sm:items-center gap-4 mr-3">
          <img height={15} width={15} src={trip} alt="" />
          <div className="radio-group flex items-center justify-around sm:gap-2">
            <div>
              <input
                type="radio"
                name="trip-type"
                id="round-trip"
                value="return"
                checked={isRoundTrip}
                onChange={() => setIsRoundTrip(true)}
              />
              <label htmlFor="round-trip" className="pl-2">
                Round-trip
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="trip-type"
                id="one-way"
                value="oneWay"
                checked={!isRoundTrip}
                onChange={() => setIsRoundTrip(false)}
              />
              <label htmlFor="one-way" className="pl-2">
                One-way
              </label>
            </div>
          </div>
          <select
            id="cabin"
            className="economy py-2 px-3 rounded-lg"
            name="cabin"
            onChange={(ele) => {
              setCabin(ele.target.value);
            }}
            value={cabin}
          >
            <option value={"economy"}>Economy</option>
            <option value={"premium_economy"}>Premium Economy</option>
            <option value={"business"}>Business</option>
            <option value={"first"}>First Class</option>
          </select>
        </div>
      </div>
      <FormContainer id="flightForm">
        <FormGroup className="sm:border-none relative">
          <FormGroupLabel htmlFor="from">
            <img height={15} width={15} src={location} alt="" />
            From
          </FormGroupLabel>
          <input
            type="text"
            id="from"
            name="from"
            autoComplete="off"
            value={from}
            onChange={(ele) => {
              setFrom(ele.target.value);
              if (ele.target.value.length > 0) {
                const getSuggestions = ["Heathrow", "London", "Karachi"];
                if (getSuggestions) setFromSuggestionBox("block");
              } else {
                document;
                setFromSuggestionBox("hidden");
              }
            }}
            onBlur={() => setFromSuggestionBox("hidden")}
          />
          <div
            id="fromSuggestions"
            className={
              fromSuggestionBox +
              " " +
              "absolute bg-white p-5 top-16 w-full z-10"
            }
          >
            <ul className="overflow-hidden">
              <li className="hover:bg-slate-400 cursor-pointer mb-3">
                Heathrow Airport (LHR)
              </li>
              <li className="hover:bg-slate-400 cursor-pointer mb-3">
                Jinnah International Airport, Karachi (KHI)
              </li>
            </ul>
          </div>
        </FormGroup>
        <FormGroup className="relative">
          <FormGroupLabel htmlFor="to">
            <img height={15} width={15} src={location} alt="" />
            To
          </FormGroupLabel>
          <input
            type="text"
            id="to"
            name="to"
            autoComplete="off"
            value={to}
            onChange={async (ele) => {
              setTo(ele.target.value);
              if (ele.target.value.length > 0) {
                const res = await getCities({ city: ele.target.value });
                console.log(res);
                const getSuggestions = ["Heathrow", "London", "Karachi"];
                if (getSuggestions) setToSuggestionBox("block");
              } else {
                document;
                setToSuggestionBox("hidden");
              }
            }}
            onBlur={() => setToSuggestionBox("hidden")}
          />
          <div
            id="fromSuggestions"
            className={
              toSuggestionBox + " " + "absolute bg-white p-5 top-16 w-full z-10"
            }
          >
            <ul className="overflow-hidden">
              <li className="hover:bg-slate-400 cursor-pointer mb-3">
                Heathrow Airport (LHR)
              </li>
              <li className="hover:bg-slate-400 cursor-pointer mb-3">
                Jinnah International Airport, Karachi (KHI)
              </li>
            </ul>
          </div>
        </FormGroup>
        <FormGroup>
          <FormGroupLabel>
            <img src={date} height={15} width={15} alt="" />
            Date
          </FormGroupLabel>
          <div className="flex flex-col mr-1">
            {isRoundTrip ? (
              <RangePicker
                minDate={today}
                onChange={(d, dStr) => {
                  setFromDate(dStr[0]);
                  setToDate(dStr[1]);
                }}
              />
            ) : (
              <DatePicker
                minDate={today}
                onChange={(d, dStr) => {
                  setFromDate(dStr);
                }}
              />
            )}
          </div>
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="children">
            <img height={15} width={15} src={person} alt="" />
            Passengers
          </FormGroupLabel>
          <select
            id="children"
            name="children"
            defaultValue={0}
            onClick={openDialog}
          >
            <option value={0} disabled>
              {adults.length} Adults, {child.length} Children
            </option>
          </select>
        </FormGroup>
        <Button2
          bg={!loading ? "var(--primary-500)" : "grey"}
          onClick={showFlights}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              color="inherit"
              size={20}
              sx={{ verticalAlign: "middle" }}
            />
          ) : (
            <>Show Flights</>
          )}
        </Button2>
      </FormContainer>
      <DialogBox open={open} onClose={closeDialog} title={"Passengers"}>
        <div className="flex flex-col p-5">
          <div className="flex flex-row justify-around items-center">
            <div className="heading font-medium text-xl">
              Adults
              <br />
              <span className="font-medium text-base text-100">
                (12+ Years)
              </span>
            </div>
            <div className="numbers flex flex-row gap-5 items-center">
              <Button
                disabled={adults.length <= 1}
                onClick={() => {
                  setAdults(adults.length > 1 ? adults.slice(0, -1) : adults);
                }}
              >
                <Remove className="border-2 border-solid border-black rounded-md" />
              </Button>
              {adults.length}
              <Button
                onClick={() => {
                  // adults.push({ type: "adult" });
                  setAdults([...adults, { type: "adult" }]);
                }}
              >
                <Add className="border-2 border-solid border-black rounded-md" />
              </Button>
            </div>
          </div>
          <div className="flex flex-row justify-around items-center">
            <div className="heading font-medium text-xl">
              Children
              <br />
              <span className="font-medium text-base text-100">
                (2-12 Years)
              </span>
            </div>
            <div className="numbers flex flex-row gap-5 items-center">
              <Button
                disabled={child.length <= 0}
                onClick={() => {
                  setChild(child.length > 0 ? child.slice(0, -1) : child);
                }}
              >
                <Remove className="border-2 border-solid border-black rounded-md" />
              </Button>
              {child.length}
              <Button
                onClick={() => {
                  setChild([...child, { age: 1 }]);
                  console.log("helo");
                  console.log(child.length);
                }}
              >
                <Add className="border-2 border-solid border-black rounded-md" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            {child.length > 0 && (
              <div>
                <input type="text" />
              </div>
            )}
          </div>
        </div>
      </DialogBox>
    </>
  );
}

export function HotelForm({ children }) {
  const navigate = useNavigate();
  const showHotels = () => {
    return navigate("/search/hotels");
  };
  return (
    <>
      {children}
      <FormContainer id="hotelForm">
        <FormGroup>
          <FormGroupLabel htmlFor="destination">
            <img height={15} width={15} src={location} alt="" /> Enter
            Destination
          </FormGroupLabel>
          <input
            type="text"
            id="destination"
            name="destination"
            placeholder="Enter destination"
          />
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="checkin">
            <img height={15} width={15} src={day} alt="" /> Check-in:
          </FormGroupLabel>
          <input type="date" id="checkin" name="checkin" />
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="checkout">
            <img height={15} width={15} src={day} alt="" /> Check-out:
          </FormGroupLabel>
          <input type="date" id="checkout" name="checkout" />
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="rooms">
            <img height={15} width={15} src={person} alt="" /> Rooms &amp;
            Guests:
          </FormGroupLabel>
          <select id="to" name="to">
            <option value={1}>1 Room, 2 Guest</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>{" "}
        </FormGroup>
        <Button2 bg="var(--primary-500)" onClick={showHotels}>
          Search Hotels
        </Button2>
      </FormContainer>
    </>
  );
}

export function CarRentalForm({ children }) {
  return (
    <>
      {children}
      <FormContainer id="carRentalForm">
        <FormGroup>
          <FormGroupLabel htmlFor="pickupLocation">
            <img height={15} width={15} src={location} alt="" /> Pickup Location
          </FormGroupLabel>
          <input
            type="text"
            id="pickup"
            name="pickup"
            placeholder="Enter pickup location"
          />
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="pickupDate">
            <img height={15} width={15} src={clock} alt="" />
            Pickup Date
          </FormGroupLabel>
          <input type="date" id="pickupDate" name="pickupDate" />
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="pickupTime">
            <img height={15} width={15} src={date} alt="" />
            Pickup Time
          </FormGroupLabel>
          <input type="time" id="pickupTime" name="pickupTime" />
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="returnDate">
            <img height={15} width={15} src={clock} alt="" />
            Return Date
          </FormGroupLabel>
          <input type="date" id="returnDate" name="returnDate" />
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="returnTime">Return Time:</FormGroupLabel>
          <input type="time" id="returnTime" name="returnTime" />
        </FormGroup>
      </FormContainer>
      <div className="carfooter flex flex-col sm:flex-row justify-between items-start">
        <div className="checkbox-container flex flex-col">
          <label className="text-black mb-1 text-sm">
            <input type="checkbox" name="option1" defaultValue={1} /> Return car
            to a different location
          </label>
          <label className="text-black mb-1 text-sm">
            <input type="checkbox" name="option2" defaultValue={2} /> Driver
            aged between 25 - 75
          </label>
        </div>
        <Button2
          bg="var(--primary-500)"
          classes="mt-1 sm:mt-0 w-full sm:w-28"
          width={null}
        >
          Search
        </Button2>
      </div>
    </>
  );
}

export default function DynamicForm({
  flight = "none",
  hotel = "none",
  carRental = "none",
}) {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [cabin, setCabin] = useState("economy");
  function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  return (
    <div className="dynamic-container bg-white sm:bg-transparent rounded-2xl sm:border-none">
      <div className="tab bg-transparent flex justify-start">
        <TabContainer>
          <TabButton
            area={flight == "block" ? "active" : ""}
            onClick={(e) => {
              openTab(e, "Flight");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-airplane-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849" />
            </svg>{" "}
            Flight
          </TabButton>
          <TabButton
            area={hotel == "block" ? "active" : ""}
            onClick={(e) => {
              openTab(e, "Hotel");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-building-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
            </svg>{" "}
            Hotel
          </TabButton>
          <TabButton
            area={carRental == "block" ? "active" : ""}
            onClick={(e) => {
              openTab(e, "CarRental");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-taxi-front-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6 1a1 1 0 0 0-1 1v1h-.181A2.5 2.5 0 0 0 2.52 4.515l-.792 1.848a.8.8 0 0 1-.38.404c-.5.25-.855.715-.965 1.262L.05 9.708a2.5 2.5 0 0 0-.049.49v.413c0 .814.39 1.543 1 1.997V14.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1.338c1.292.048 2.745.088 4 .088s2.708-.04 4-.088V14.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1.892c.61-.454 1-1.183 1-1.997v-.413q0-.248-.049-.49l-.335-1.68a1.8 1.8 0 0 0-.964-1.261.8.8 0 0 1-.381-.404l-.792-1.848A2.5 2.5 0 0 0 11.181 3H11V2a1 1 0 0 0-1-1zM4.309 4h7.382a.5.5 0 0 1 .447.276l.956 1.913a.51.51 0 0 1-.497.731c-.91-.073-3.35-.17-4.597-.17s-3.688.097-4.597.17a.51.51 0 0 1-.497-.731l.956-1.913A.5.5 0 0 1 4.309 4M4 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-9 0a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1" />
            </svg>{" "}
            Car Rental
          </TabButton>
        </TabContainer>
      </div>
      <TabContent id="Flight" display={flight}>
        <FlightForm isRoundTrip={isRoundTrip} cabin={cabin} />
      </TabContent>
      <TabContent id="Hotel" display={hotel}>
        <HotelForm>
          <h3 className="ml-3">Where do you like to stay?</h3>
        </HotelForm>
      </TabContent>
      <TabContent id="CarRental" display={carRental}>
        <CarRentalForm>
          <h3 className="ml-3">Where do you want to go?</h3>
        </CarRentalForm>
      </TabContent>
    </div>
  );
}
