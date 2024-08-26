import { useEffect, useState } from "react";
import clock from "../../assets/img/dynamic-form/clock.png";
import date from "../../assets/img/dynamic-form/date.png";
import day from "../../assets/img/dynamic-form/day.png";
import location from "../../assets/img/dynamic-form/location.png";
import person from "../../assets/img/dynamic-form/person.png";
import trip from "../../assets/img/dynamic-form/trip.png";
import Button2 from "./Button2";
import { useLocation, useNavigate } from "react-router-dom";
import DialogBox from "../UnCommon/DialogBox";
import dayjs from "dayjs";
import { Add, AddCircle, Remove, RemoveCircle } from "@mui/icons-material";
import { Button, CircularProgress, TextField } from "@mui/material";
import { DatePicker, Popover } from "antd";
import { useAPI, APIS } from "../../api/config";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { HotelContext, HotelProvider } from "../../context/HoteContext";
import Swal from "sweetalert2";

const today = dayjs();

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
      style={{
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      {children}
      <span
        style={{
          content: '""',
          position: "absolute",
          right: 0,
          top: "50%",
          height: "50%", // Adjust this to change the height of the border
          width: "1px",
          backgroundColor: "gray",
          transform: "translateY(-50%)",
        }}
      ></span>
    </button>
  );
}

function TabContent({ children, id, display }) {
  return (
    <div
      id={id}
      className="tabcontent sm:bg-white text-black border-transparent sm:border-solid sm:border sm:rounded-2xl hidden p-5 w-full"
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

function FormGroup({ children, style = null, className = "", onBlur }) {
  return (
    <div
      className={"form-group flex flex-col flex-1 my-3 sm:mx-3 " + className}
      style={style}
      onBlur={onBlur}
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

const FromInput = ({ id = 1, setter, value = null }) => {
  const [getCities, cityLoading] = useAPI(APIS.cities);
  const [from, setFrom] = useState("");
  const [fromText, setFromText] = useState(value);
  const [fromSuggestionBox, setFromSuggestionBox] = useState("hidden");
  const [fromDivEnter, setFromDivEnter] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState([]);

  useEffect(() => {
    setter(from);
  }, [from]);

  return (
    <div className="mt-3 relative">
      <input
        type="text"
        id={`fromMulti-${id}`}
        name={`fromMulti-${id}`}
        autoComplete="off"
        style={{
          padding: "1rem",
          border: "1px solid gray",
          width: "98%",
        }}
        placeholder="Source"
        value={fromText}
        onChange={async (ele) => {
          setFrom(ele.target.value);
          setFromText(ele.target.value);
          if (ele.target.value.length > 0) {
            setFromSuggestionBox("block");
            try {
              const res = await getCities({ city: ele.target.value });
              console.log(res);
              setFromSuggestions(res.data);
            } catch (err) {
              console.error(err);
            }
          } else {
            setFromSuggestionBox("hidden");
          }
        }}
        // onBlur={() => setFromSuggestionBox("hidden")}
      />
      <div
        id={`fromSuggestionsMulti-${id}`}
        className={
          fromSuggestionBox +
          " " +
          "absolute bg-white p-5 top-16 w-full z-10 shadow-md rounded-b-md"
        }
      >
        {cityLoading && (
          <CircularProgress className="mx-auto text-center" size={20} />
        )}
        <ul className="overflow-y-scroll h-48">
          {fromSuggestions.map((suggestion, i) => (
            <li
              key={i}
              className="cursor-pointer mb-3"
              // aria-iata-code={suggestion.iata_code}
              onClick={(e) => {
                setFrom(suggestion.iata_code);
                setFromSuggestionBox("hidden");
                setFromText(
                  `${suggestion.name}, ${suggestion.city_name} (${suggestion.iata_code})`
                );
              }}
            >
              {`${suggestion.name}, ${suggestion.city_name} (${suggestion.iata_code})`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ToInput = ({ id = 1, setter, value = null }) => {
  const [getCities, cityLoading] = useAPI(APIS.cities);
  const [to, setTo] = useState("");
  const [toText, setToText] = useState("");
  const [toSuggestionBox, setToSuggestionBox] = useState("hidden");
  const [toDivEnter, setToDivEnter] = useState(false);
  const [toSuggestions, setToSuggestions] = useState([]);

  useEffect(() => {
    setter(to);
  }, [to]);

  return (
    <div className="mt-3 relative">
      <input
        type="text"
        id={`toMulti-${id}`}
        name={`toMulti-${id}`}
        autoComplete="off"
        style={{
          padding: "1rem",
          border: "1px solid gray",
          width: "98%",
        }}
        placeholder="Destination"
        value={toText}
        onChange={async (ele) => {
          setTo(ele.target.value);
          setToText(ele.target.value);
          if (ele.target.value.length > 0) {
            setToSuggestionBox("block");
            try {
              const res = await getCities({ city: ele.target.value });
              setToSuggestions(res.data);
            } catch (err) {
              console.error(err);
            }
          } else {
            setToSuggestionBox("hidden");
          }
        }}
        // onBlur={() => setToSuggestionBox("hidden")}
      />
      <div
        id={`toSuggestionsMulti-${id}`}
        className={
          toSuggestionBox + " " + "absolute bg-white p-5 top-16 w-full z-10"
        }
      >
        {cityLoading && (
          <CircularProgress className="mx-auto text-center" size={20} />
        )}
        <ul className="overflow-y-scroll h-48">
          {toSuggestions.map((suggestion, i) => (
            <li
              key={i}
              className="cursor-pointer mb-3"
              // aria-iata-code={suggestion.iata_code}
              onClick={(e) => {
                setTo(suggestion.iata_code);
                setToSuggestionBox("hidden");
                setToText(
                  `${suggestion.name}, ${suggestion.city_name} (${suggestion.iata_code})`
                );
              }}
            >
              {`${suggestion.name}, ${suggestion.city_name} (${suggestion.iata_code})`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const DateInput = ({ id = 1, dateSetter, value = null }) => {
  return (
    <DatePicker
      id={`multi-date-${id}`}
      className="mt-3"
      style={{
        padding: "1rem",
        border: "1px solid gray",
      }}
      minDate={today}
      onChange={(d, dStr) => {
        dateSetter(dStr);
      }}
    />
  );
};

function FlightForm({
  roundTrip = false,
  multiCity = false,
  multiCityFormList = 1,
  multiCityObjectList = [],
  cabinType = "economy",
  fromCity = "",
  fromCityText = "",
  toCity = "",
  toCityText = "",
  fromDateValue = "",
  toDateValue = "",
  adultCount = [{ type: "adult" }],
  childCount = [],
}) {
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const [getOffers, loading] = useAPI(APIS.listOffers);
  const [getCities, cityLoading] = useAPI(APIS.cities);
  const [isRoundTrip, setIsRoundTrip] = useState(roundTrip);
  const [isMultiCity, setMultiCity] = useState(multiCity);
  const [multiCityForms, setMultiCityForms] = useState(multiCityFormList);
  const [multiCityObjects, setMultiCityObjects] = useState(multiCityObjectList);
  const [cabin, setCabin] = useState(cabinType);
  const [from, setFrom] = useState(fromCity);
  const [fromText, setFromText] = useState(fromCityText);
  const [to, setTo] = useState(toCity);
  const [toText, setToText] = useState(toCityText);
  const [fromDate, setFromDate] = useState(fromDateValue);
  const [toDate, setToDate] = useState(toDateValue);
  const [adults, setAdults] = useState(adultCount);
  const [child, setChild] = useState(childCount);
  const [infantSeat, setInfantSeat] = useState([]);
  const [infantLap, setInfantLap] = useState([]);
  const formData = {
    isRoundTrip: isRoundTrip,
    isMultiCity: isMultiCity,
    multiCityForms: multiCityForms,
    multiCityObjects: multiCityObjects,
    cabin: cabin,
    from: from,
    fromText: fromText,
    to: to,
    toText: toText,
    fromDate: fromDate,
    toDate: toDate,
    adults: adults,
    child: child,
  };
  const [fromSuggestionBox, setFromSuggestionBox] = useState("hidden");
  const [fromDivEnter, setFromDivEnter] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestionBox, setToSuggestionBox] = useState("hidden");
  const [toDivEnter, setToDivEnter] = useState(false);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [open, setOpen] = useState(false);

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
    if (!isMultiCity) data.slices = [data.slices[0]];
  }, [isMultiCity]);

  useEffect(() => {
    if (multiCityForms == 1 && multiCityObjects[0]?.origin == null) {
      const obj = [
        {
          origin: null,
          destination: null,
          departure_date: null,
        },
      ];
      setMultiCityObjects(obj);
    } else {
      if (multiCityForms > multiCityObjects.length) {
        const obj = {
          origin: null,
          destination: null,
          departure_date: null,
        };
        // multiCityObjects.push(obj);
        setMultiCityObjects([...multiCityObjects, obj]);
      } else if (multiCityForms < multiCityObjects.length) {
        const temp = [...multiCityObjects];
        temp.pop();
        setMultiCityObjects(temp);
      }
    }
  }, [multiCityForms]);
  useEffect(() => {
    if (isMultiCity) data.slices = [data.slices[0], ...multiCityObjects];
    console.log(data);
  }, [multiCityObjects]);

  useEffect(() => {
    if (fromSuggestions.length > 0) {
      setFromSuggestionBox("block");
    }
  }, [fromSuggestions]);

  useEffect(() => {
    if (toSuggestions.length > 0) {
      setToSuggestionBox("block");
    }
  }, [toSuggestions]);

  useEffect(() => {
    console.log(data);
  }, [cabin, from, to, fromDate, toDate, adults, child, isRoundTrip]);

  const openDialog = (newOpen) => {
    setOpen(newOpen);
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
    else if (isMultiCity) data.slices = [data.slices[0], ...multiCityObjects];

    console.log(data);

    try {
      // const res = await getOffers(data);
      // return navigate(`/search/flight/${JSON.stringify(data)}`);
      return navigate(`/search/flight`, {
        state: {
          flights: JSON.stringify(data),
          formData: JSON.stringify(formData),
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="form-header flex flex-col-reverse gap-1 sm:gap-0 sm:flex-row justify-between sm:items-center mb-2 sm:mb-0">
        <h4 className="ml-3 mt-4 sm:mt-0">Where are you flying?</h4>
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
                onChange={() => {
                  setMultiCity(false);
                  setIsRoundTrip(true);
                }}
              />
              <label htmlFor="round-trip" className="pl-2">
                Round trip
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="trip-type"
                id="multi-city"
                value="multi"
                checked={isMultiCity}
                onChange={() => {
                  setMultiCity(true);
                  setIsRoundTrip(false);
                }}
              />
              <label htmlFor="multi-city" className="pl-2">
                Multi City
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="trip-type"
                id="one-way"
                value="oneWay"
                checked={!isRoundTrip && !isMultiCity}
                onChange={() => {
                  setMultiCity(false);
                  setIsRoundTrip(false);
                }}
              />
              <label htmlFor="one-way" className="pl-2">
                One way
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
            placeholder="Source"
            autoComplete="off"
            value={fromText}
            style={{
              padding: "1rem",
              border: "1px solid gray",
            }}
            onChange={async (ele) => {
              setFrom(ele.target.value);
              setFromText(ele.target.value);
              if (ele.target.value.length > 0) {
                setFromSuggestionBox("block");
                try {
                  const res = await getCities({ city: ele.target.value });
                  console.log(res);
                  setFromSuggestions(res.data);
                } catch (err) {
                  console.error(err);
                }
              } else {
                setFromSuggestionBox("hidden");
              }
            }}
            onFocus={() => {
              setToSuggestionBox("hidden");
              setToDivEnter(false);
            }}
          />
          <div
            id="fromSuggestions"
            className={
              fromSuggestionBox +
              " " +
              "absolute bg-white p-5 top-16 w-full z-10 shadow-md rounded-b-md"
            }
            // onMouseEnter={() => setFromDivEnter(true)}
            // onMouseLeave={() => setFromDivEnter(false)}
          >
            {cityLoading && (
              <CircularProgress className="mx-auto text-center" size={20} />
            )}
            <ul className="overflow-y-scroll h-48">
              {fromSuggestions.map((suggestion, i) => (
                <li
                  key={i}
                  className="cursor-pointer mb-3"
                  // aria-iata-code={suggestion.iata_code}
                  onClick={(e) => {
                    setFrom(suggestion.iata_code);
                    setFromSuggestionBox("hidden");
                    setFromText(
                      `${suggestion.name}, ${suggestion.city_name} (${suggestion.iata_code})`
                    );
                  }}
                >
                  {`${suggestion.name}, ${suggestion.city_name} (${suggestion.iata_code})`}
                </li>
              ))}
            </ul>
          </div>
          {isMultiCity &&
            multiCityObjects.map((item, i) => {
              return (
                <FromInput
                  key={i}
                  id={i}
                  setter={(value) => {
                    item.origin = value;
                    setMultiCityObjects([...multiCityObjects]);
                  }}
                />
              );
            })}
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
            placeholder="Destination"
            style={{
              padding: "1rem",
              border: "1px solid gray",
            }}
            value={toText}
            onChange={async (ele) => {
              setTo(ele.target.value);
              setToText(ele.target.value);
              if (ele.target.value.length > 0) {
                setToSuggestionBox("block");
                try {
                  const res = await getCities({ city: ele.target.value });
                  setToSuggestions(res.data);
                } catch (err) {
                  console.error(err);
                }
              } else {
                setToSuggestionBox("hidden");
              }
            }}
            onFocus={() => {
              setFromSuggestionBox("hidden");
              setFromDivEnter(false);
            }}
          />
          <div
            id="toSuggestions"
            className={
              toSuggestionBox + " " + "absolute bg-white p-5 top-16 w-full z-10"
            }
            // onMouseEnter={() => setToDivEnter(true)}
            // onMouseLeave={() => setToDivEnter(false)}
            // onBlur={() => setToSuggestionBox("hidden")}
          >
            {cityLoading && (
              <CircularProgress className="mx-auto text-center" size={20} />
            )}
            <ul className="overflow-y-scroll h-48">
              {toSuggestions.map((suggestion, i) => (
                <li
                  key={i}
                  className="cursor-pointer mb-3"
                  // aria-iata-code={suggestion.iata_code}
                  onClick={(e) => {
                    setTo(suggestion.iata_code);
                    setToSuggestionBox("hidden");
                    setToText(
                      `${suggestion.name}, ${suggestion.city_name} (${suggestion.iata_code})`
                    );
                  }}
                >
                  {`${suggestion.name}, ${suggestion.city_name} (${suggestion.iata_code})`}
                </li>
              ))}
            </ul>
          </div>
          {isMultiCity &&
            multiCityObjects.map((item, i) => {
              return (
                <ToInput
                  key={i}
                  id={i}
                  setter={(value) => {
                    item.destination = value;
                    setMultiCityObjects([...multiCityObjects]);
                  }}
                />
              );
            })}
        </FormGroup>
        <FormGroup>
          <FormGroupLabel>
            <img src={date} height={15} width={15} alt="" />
            Date
          </FormGroupLabel>
          <div className="flex flex-col mr-1">
            {isRoundTrip ? (
              <RangePicker
                style={{
                  padding: "1rem",
                  border: "1px solid gray",
                }}
                minDate={today}
                value={[fromDate && dayjs(fromDate), toDate && dayjs(toDate)]}
                onChange={(d, dStr) => {
                  setFromDate(dStr[0]);
                  setToDate(dStr[1]);
                }}
              />
            ) : (
              <DatePicker
                style={{
                  padding: "1rem",
                  border: "1px solid gray",
                }}
                minDate={today}
                value={fromDate && dayjs(fromDate)}
                onChange={(d, dStr) => {
                  setFromDate(dStr);
                }}
              />
            )}
            {isMultiCity &&
              multiCityObjects.map((item, i) => {
                return (
                  <DateInput
                    key={i}
                    id={i}
                    dateSetter={(value) => {
                      item.departure_date = value;
                      setMultiCityObjects([...multiCityObjects]);
                    }}
                  />
                );
              })}
          </div>
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="children">
            <img height={15} width={15} src={person} alt="" />
            Passengers
          </FormGroupLabel>
          <Popover
            placement="bottom"
            content={
              <div className="flex flex-col p-5 gap-3">
                <div className="flex flex-row justify-between items-center gap-10">
                  <div className="heading font-medium text-xl">
                    Adults
                    <br />
                    <span className="font-medium text-base text-100">
                      (12+ Years)
                    </span>
                  </div>
                  <div className="numbers flex flex-row justify-end items-center">
                    <Button
                      disabled={adults.length <= 1}
                      onClick={() => {
                        setAdults(
                          adults.length > 1 ? adults.slice(0, -1) : adults
                        );
                      }}
                    >
                      <Remove className="bg-gray-200 text-gray-500 border-2 border-solid rounded-full" />
                    </Button>
                    <div className="w-3/12 text-center">{adults.length}</div>
                    <Button
                      onClick={() => {
                        // adults.push({ type: "adult" });
                        setAdults([...adults, { type: "adult" }]);
                      }}
                    >
                      <Add className="bg-primary-500 text-white border-2 border-solid rounded-full" />
                    </Button>
                  </div>
                </div>
                <hr />
                <div className="flex flex-row justify-between items-center gap-10">
                  <div className="heading font-medium text-xl">
                    Children
                    <br />
                    <span className="font-medium text-base text-100">
                      (2-11 Years)
                    </span>
                  </div>
                  <div className="numbers flex flex-row justify-end items-center">
                    <Button
                      disabled={child.length <= 0}
                      onClick={() => {
                        setChild(child.length > 0 ? child.slice(0, -1) : child);
                      }}
                    >
                      <Remove className="bg-gray-200 text-gray-500 border-2 border-solid rounded-full" />
                    </Button>
                    <div className="w-3/12 text-center">{child.length}</div>
                    <Button
                      onClick={() => {
                        setChild([...child, { age: 1 }]);
                      }}
                    >
                      <Add className="bg-primary-500 text-white border-2 border-solid rounded-full" />
                    </Button>
                  </div>
                </div>
                <hr />
                <div className="flex flex-row justify-between items-center gap-10">
                  <div className="heading font-medium text-xl">
                    Infant on Seat
                    <br />
                    <span className="font-medium text-base text-100">
                      (Under 2)
                    </span>
                  </div>
                  <div className="numbers flex flex-row justify-end items-center">
                    <Button
                      disabled={infantSeat.length <= 0}
                      onClick={() => {
                        setInfantSeat(
                          infantSeat.length > 0
                            ? infantSeat.slice(0, -1)
                            : infantSeat
                        );
                      }}
                    >
                      <Remove className="bg-gray-200 text-gray-500 border-2 border-solid rounded-full" />
                    </Button>
                    <div className="w-3/12 text-center">
                      {infantSeat.length}
                    </div>
                    <Button
                      onClick={() => {
                        setInfantSeat([...infantSeat, { age: 1 }]);
                      }}
                    >
                      <Add className="bg-primary-500 text-white border-2 border-solid rounded-full" />
                    </Button>
                  </div>
                </div>
                <hr />
                <div className="flex flex-row justify-between items-center gap-10">
                  <div className="heading font-medium text-xl">
                    Infant on Lap
                    <br />
                    <span className="font-medium text-base text-100">
                      (Under 2)
                    </span>
                  </div>
                  <div className="numbers flex flex-row justify-end items-center">
                    <Button
                      disabled={infantLap.length <= 0}
                      onClick={() => {
                        setInfantLap(
                          infantLap.length > 0
                            ? infantLap.slice(0, -1)
                            : infantLap
                        );
                      }}
                    >
                      <Remove className="bg-gray-200 text-gray-500 border-2 border-solid rounded-full" />
                    </Button>
                    <div className="w-3/12 text-center">{infantLap.length}</div>
                    <Button
                      onClick={() => {
                        setInfantLap([...infantLap, { age: 1 }]);
                      }}
                    >
                      <Add className="bg-primary-500 text-white border-2 border-solid rounded-full" />
                    </Button>
                  </div>
                </div>
                {/* {child.length > 0 &&
                    child.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-row justify-around items-center"
                      id={`child-no-${i + 1}`}
                    >
                      <div className="heading font-medium text-xl">
                        Age
                        <br />
                        <span className="font-medium text-base text-100">
                          (Child {i + 1})
                        </span>
                      </div>
                      <div className="numbers flex flex-row gap-5 items-center">
                        <Button
                          className="child-rem-btn"
                          disabled={item.age <= 0}
                          onClick={() => {
                            item.age = item.age > 0 ? item.age - 1 : 0;
                            if (item.age <= 0) {
                              document
                                .querySelector(`#child-no-${i + 1} .child-rem-btn`)
                                .setAttribute("disabled", true);
                            }
                            setChild(child);
                            console.log(child);
                          }}
                        >
                          <Remove className="border-2 border-solid border-black rounded-md" />
                        </Button>
                        {item.age}
                        <Button
                          className="child-add-btn"
                          onClick={() => {
                            item.age += 1;
                            setChild(child);
                            console.log(child);
                          }}
                        >
                          <Add className="border-2 border-solid border-black rounded-md" />
                        </Button>
                      </div>
                    </div>
                  );
                })} */}
                <button
                  className="border border-black rounded-full mt-3 py-2 w-28 self-end active:bg-gray-300"
                  onClick={closeDialog}
                >
                  Close
                </button>
              </div>
            }
            trigger="click"
            open={open}
            onOpenChange={openDialog}
          >
            <div
              className="focus:border focus:border-black active:border active:border-black px-2 py-4 rounded-md cursor-pointer"
              style={{
                border: "1px solid gray",
              }}
            >
              {adults.length} Adults, {child.length} Children
            </div>
          </Popover>
          {isMultiCity && (
            <>
              <button
                type="button"
                className="mt-2 multiCityBtn"
                onClick={() => setMultiCityForms(multiCityForms + 1)}
              >
                <AddCircle sx={{ color: "var(--primary-500)", fontSize: 30 }} />
              </button>
              {multiCityObjects.map((v, k) => {
                if (k > 0)
                  return (
                    <button
                      type="button"
                      className="mt-3 multiCityBtn"
                      onClick={() => setMultiCityForms(multiCityForms - 1)}
                    >
                      <RemoveCircle
                        sx={{ color: "var(--red)", fontSize: 30 }}
                      />
                    </button>
                  );
              })}
            </>
          )}
        </FormGroup>
        <Button
          className="quicksand"
          variant="contained"
          sx={{
            backgroundColor: !loading ? "var(--primary-500)" : "grey",
            marginTop: "1.5rem",
            borderRadius: "1rem",
            textTransform: "capitalize",
          }}
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
            <>Search</>
          )}
        </Button>
      </FormContainer>
      {/* <DialogBox
        open={open}
        onClose={closeDialog}
        title={"Passengers"}
      ></DialogBox> */}
    </>
  );
}

function HotelForm({ children }) {
  const navigate = useNavigate();
  const [dest, setDest] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [roomsGuest, setRoomsGuest] = useState("1 Room, 2 Guest");
  const { data, setData } = useContext(HotelContext);
  const [adults, setAdults] = useState([]);
  const [child, setChild] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [hotelLoading, setHotelLoading] = useState(false);

  const openDialog = (newOpen) => {
    setOpen(newOpen);
  };
  const closeDialog = () => {
    setOpen(false);
  };

  const showHotels = () => {
    console.log("Destination: ", dest);
    console.log("Checkin Date: ", checkin);
    console.log("Checkout Date: ", checkout);
    console.log("Rooms: ", roomsGuest);
    navigate("/search/hotels", { state: { dest, checkin, checkout } });
  };
  useEffect(() => {
    console.log("Hotel Updated Value: ", data);
  }, [data]);
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
            style={{
              padding: "1rem",
              border: "1px solid gray",
            }}
            name="destination"
            placeholder="Destination"
            onChange={(e) => {
              setDest(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="checkin">
            <img height={15} width={15} src={day} alt="" /> Check-in:
          </FormGroupLabel>
          <input
            type="date"
            id="checkin"
            name="checkin"
            style={{
              padding: "1rem",
              border: "1px solid gray",
            }}
            onChange={(e) => {
              setCheckin(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="checkout">
            <img height={15} width={15} src={day} alt="" /> Check-out:
          </FormGroupLabel>
          <input
            type="date"
            id="checkout"
            name="checkout"
            style={{
              padding: "1rem",
              border: "1px solid gray",
            }}
            onChange={(e) => {
              setCheckout(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="rooms">
            <img height={15} width={15} src={person} alt="" /> Rooms &amp;
            Guests:
          </FormGroupLabel>
          <Popover
            placement="bottom"
            content={
              <div className="flex flex-col p-5 gap-3">
                <div className="flex flex-row justify-between items-center gap-10">
                  <div className="heading font-medium text-xl">
                    Adults
                    <br />
                    <span className="font-medium text-base text-100">
                      (12+ Years)
                    </span>
                  </div>
                  <div className="numbers flex flex-row justify-end items-center">
                    <Button
                      disabled={adults.length <= 1}
                      onClick={() => {
                        setAdults(
                          adults.length > 1 ? adults.slice(0, -1) : adults
                        );
                      }}
                    >
                      <Remove className="bg-gray-200 text-gray-500 border-2 border-solid rounded-full" />
                    </Button>
                    <div className="w-3/12 text-center">{adults.length}</div>
                    <Button
                      onClick={() => {
                        // adults.push({ type: "adult" });
                        setAdults([...adults, { type: "adult" }]);
                      }}
                    >
                      <Add className="bg-primary-500 text-white border-2 border-solid rounded-full" />
                    </Button>
                  </div>
                </div>
                <hr />
                <div className="flex flex-row justify-between items-center gap-10">
                  <div className="heading font-medium text-xl">
                    Children
                    <br />
                    <span className="font-medium text-base text-100">
                      (0-17 Years)
                    </span>
                  </div>
                  <div className="numbers flex flex-row justify-end items-center">
                    <Button
                      disabled={child.length <= 0}
                      onClick={() => {
                        setChild(child.length > 0 ? child.slice(0, -1) : child);
                      }}
                    >
                      <Remove className="bg-gray-200 text-gray-500 border-2 border-solid rounded-full" />
                    </Button>
                    <div className="w-3/12 text-center">{child.length}</div>
                    <Button
                      onClick={() => {
                        setChild([...child, { age: 1 }]);
                      }}
                    >
                      <Add className="bg-primary-500 text-white border-2 border-solid rounded-full" />
                    </Button>
                  </div>
                </div>
                <hr />
                <div className="flex flex-row justify-between items-center gap-10">
                  <div className="heading font-medium text-xl">Rooms</div>
                  <div className="numbers flex flex-row justify-end items-center">
                    <Button
                      disabled={rooms.length <= 0}
                      onClick={() => {
                        setRooms(rooms.length > 0 ? rooms.slice(0, -1) : rooms);
                      }}
                    >
                      <Remove className="bg-gray-200 text-gray-500 border-2 border-solid rounded-full" />
                    </Button>
                    <div className="w-3/12 text-center">{rooms.length}</div>
                    <Button
                      onClick={() => {
                        setRooms([...rooms, { age: 1 }]);
                      }}
                    >
                      <Add className="bg-primary-500 text-white border-2 border-solid rounded-full" />
                    </Button>
                  </div>
                </div>
                <button
                  className="border border-black rounded-full mt-3 py-2 w-28 self-end active:bg-gray-300"
                  onClick={closeDialog}
                >
                  Close
                </button>
              </div>
            }
            trigger="click"
            open={open}
            onOpenChange={openDialog}
          >
            <div
              className="focus:border focus:border-black active:border active:border-black px-2 py-4 rounded-md cursor-pointer"
              style={{
                border: "1px solid gray",
              }}
            >
              {adults.length} Adults, {child.length} Children, {rooms.length}{" "}
              Rooms
            </div>
          </Popover>
        </FormGroup>
        <Button
          className="quicksand"
          variant="contained"
          sx={{
            backgroundColor: "var(--primary-500)",
            marginTop: "1.5rem",
            borderRadius: "1rem",
            textTransform: "capitalize",
          }}
          // onClick={showHotels}
          onClick={() => {
            setHotelLoading(true);
            setTimeout(() => {
              Swal.fire({
                titleText: "Duffle Error",
                text: "Our Hotel Servers are down right now. Please try again later.",
                icon: "error",
                showConfirmButton: false,
                timer: 6000,
              }).then(() => setHotelLoading(false));
            }, 8000);
          }}
        >
          {hotelLoading ? (
            <CircularProgress
              color="inherit"
              size={20}
              sx={{ verticalAlign: "middle" }}
            />
          ) : (
            <>Search</>
          )}
        </Button>
      </FormContainer>
    </>
  );
}

function CarRentalForm({ children }) {
  return (
    <>
      {children}
      <FormContainer id="carRentalForm">
        <FormGroup>
          <FormGroupLabel htmlFor="pickupLocation">
            <img height={15} width={15} src={location} alt="" /> Pickup Location
          </FormGroupLabel>
          <input
            style={{
              padding: "1rem",
              border: "1px solid gray",
            }}
            type="text"
            id="pickup"
            name="pickup"
            placeholder="Location"
          />
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="pickupDate">
            <img height={15} width={15} src={clock} alt="" />
            Pickup Date
          </FormGroupLabel>
          <input
            type="date"
            id="pickupDate"
            name="pickupDate"
            style={{
              padding: "1rem",
              border: "1px solid gray",
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="pickupTime">
            <img height={15} width={15} src={date} alt="" />
            Pickup Time
          </FormGroupLabel>
          <input
            type="time"
            id="pickupTime"
            name="pickupTime"
            style={{
              padding: "1rem",
              border: "1px solid gray",
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="returnDate">
            <img height={15} width={15} src={clock} alt="" />
            Return Date
          </FormGroupLabel>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            style={{
              padding: "1rem",
              border: "1px solid gray",
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormGroupLabel htmlFor="returnTime">Return Time:</FormGroupLabel>
          <input
            type="time"
            id="returnTime"
            name="returnTime"
            style={{
              padding: "1rem",
              border: "1px solid gray",
            }}
          />
        </FormGroup>
      </FormContainer>
      <div className="carfooter flex flex-col sm:flex-row justify-between items-start">
        <div className="checkbox-container flex flex-col">
          <label className="text-black mb-1 mt-1 text-sm">
            <input type="checkbox" name="option1" defaultValue={1} /> Return car
            to a different location
          </label>
          <label className="text-black mb-1 text-sm">
            <input type="checkbox" name="option2" defaultValue={2} /> Driver
            aged between 25 - 75
          </label>
        </div>

        <Button
          className="quicksand"
          variant="contained"
          sx={{
            backgroundColor: "var(--primary-500)",
            marginTop: "1.5rem",
            borderRadius: "1rem",
            textTransform: "capitalize",
          }}
        >
          Search
        </Button>
        {/* <Button2
          bg="var(--primary-500)"
          classes="mt-1 sm:mt-0 w-full sm:w-28"
          width={null}
        >
          Search
        </Button2> */}
      </div>
    </>
  );
}

function SearchForm({ flight = "none", hotel = "none", carRental = "none" }) {
  const openTab = (evt, tabName) => {
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
  };
  return (
    <div className="dynamic-container bg-white sm:bg-transparent rounded-2xl sm:border-none">
      {/* <div className="tab bg-transparent flex justify-start">
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
            <span style={{ display: "block", marginLeft: "0.4rem" }}>
              Flight
            </span>
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
            <span style={{ display: "block", marginLeft: "0.4rem" }}>
              Hotel
            </span>
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
            <span style={{ display: "block", marginLeft: "0.4rem" }}>
              Car Rental
            </span>
          </TabButton>
        </TabContainer>
      </div> */}
      <TabContent id="Flight" display={flight}>
        <FlightForm />
      </TabContent>
      <TabContent id="Hotel" display={hotel}>
        <HotelProvider>
          <HotelForm>
            <h4 className="ml-3">Where do you like to stay?</h4>
          </HotelForm>
        </HotelProvider>
      </TabContent>
      <TabContent id="CarRental" display={carRental}>
        <CarRentalForm>
          <h4 className="ml-3">Where do you want to go?</h4>
        </CarRentalForm>
      </TabContent>
    </div>
  );
}

export { SearchForm, FlightForm, HotelForm, CarRentalForm };
