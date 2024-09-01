import { useContext, useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Circle, KeyboardArrowDownOutlined, Star } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button3 from "../Common/Button3";
import Button2 from "../Common/Button2";
import { useLocation, useNavigate } from "react-router-dom";
import Carousel from "../Common/Carousel";
import Slideshow from "./Slideshow";
import { useAPI, APIS } from "../../api/config";
import moment from "moment";
import { GoDash } from "react-icons/go";
import { useCurrency } from "../../hooks/useCurrency";
import { CurrencyContext } from "../../context/CurrencyContext";
import Swal from "sweetalert2";

const Section = ({ children, className = "", style = {} }) => {
  return (
    <div className={`mx-4 sm:mx-8 md:mx-14 py-6 ${className}`} style={style}>
      {children}
    </div>
  );
};

const ShadowBox = ({ children }) => {
  return <div className="bg-white p-4 shadow-lg rounded-2xl">{children}</div>;
};

const FilterCorner = ({ children, style }) => {
  return (
    <div
      className="flex flex-col items-center justify-start flex-shrink basis-1/3 p-4 shadow-2xl rounded-lg bg-white"
      style={style}
    >
      <div className="font-semibold text-xl mb-5 text-left self-stretch ml-9">
        Filters
      </div>
      <div className="filter-container">{children}</div>
    </div>
  );
};

const Filter = ({ uniqueName, heading, children }) => {
  return (
    <div className="mb-5">
      <Accordion
        sx={{
          border: "none",
          boxShadow: "none",
          background: "transparent",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${uniqueName}-content`}
          id={`${uniqueName}-header`}
          sx={{
            border: "none",
            boxShadow: "none",
            background: "transparent",
            pl: 0,
          }}
        >
          <div className="filter-heading font-semibold text-base">
            {heading}
          </div>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
};

const FilterSlider = ({ min, max, symbol, dist }) => {
  const minDistance = dist;
  const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        min={599}
        max={2200}
        disableSwap
      />
      <div className="flex flex-row justify-between">
        <div className="slider-value font-medium text-xs">
          {symbol + value[0]}
        </div>
        <div className="slider-value font-medium text-xs">
          {symbol + value[1]}
        </div>
      </div>
    </div>
  );
};

const FilterRadio = ({ list, uniqueName, onChange = null }) => {
  return (
    <RadioGroup id={uniqueName} onChange={onChange}>
      {list.map((item, index) => {
        return (
          <FormControlLabel
            className="filter-radio font-normal text-sm"
            value={item.value}
            control={<Radio />}
            label={item.label}
            key={index}
          />
        );
      })}
    </RadioGroup>
  );
};

const FilterCheckbox = ({ list, uniqueName }) => {
  return (
    <FormGroup id={uniqueName}>
      {list.map((item, index) => {
        return (
          <FormControlLabel
            className="filter-radio font-normal text-sm"
            value={item.value}
            control={<Checkbox name={item.id} id={item.id} />}
            label={item.label}
            key={index}
          />
        );
      })}
    </FormGroup>
  );
};

const ResultContainer = ({
  children,
  className = "flex flex-col justify-start basis-2/3 px-4 overflow-x-hidden",
}) => {
  return <div className={className}>{children}</div>;
};

const ResultCount = ({ showing, total, type }) => {
  return (
    <div className="flex flex-row justify-between items-center px-1 my-8 ms-2 font-semibold text-base">
      <div className="page-result-count">
        Showing {showing} of{" "}
        <span style={{ color: "#ff8682" }}>
          {total} {type}
        </span>
      </div>
      {/* <div className="page-result-sorting flex flex-row items-center">
        <span className="font-normal">Sort by</span>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            <span className="font-semibold text-base">Recommended</span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Recommended"
            sx={{ mb: 2, pl: 12 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div> */}
    </div>
  );
};

const ResultBox = ({
  children,
  uniqueClassname = "",
  justify = "justify-around",
  padding = "p-2",
  flex = "",
  changeSize = "",
  hidden = false,
  style = {},
}) => {
  const display = hidden ? "hidden " : "";
  const flexDirection =
    flex == "row-col"
      ? "flex-col " + changeSize + ":flex-row"
      : flex == "col-row"
      ? "flex-row " + changeSize + ":flex-column"
      : flex == "row"
      ? "flex-row"
      : flex == "col"
      ? "flex-col"
      : "";
  return (
    <div
      className={
        display +
        "flex " +
        flexDirection +
        " " +
        justify +
        " " +
        padding +
        " w-full rounded-2xl overflow-hidden result-box " +
        uniqueClassname
      }
      style={style}
    >
      {children}
    </div>
  );
};

export const ShowFlights = ({ resBox, uniqueName, showPrice = true }) => {
  // console.clear();
  const [paymentIntent, intentLoading] = useAPI(APIS.createPaymentIntent);
  const [currency, _, convert] = useContext(CurrencyContext);
  const navigate = useNavigate();
  const location = useLocation();
  // const formData = JSON.parse(location.state.formData);
  const flightSegments = resBox.slices[0].segments;
  const depart = flightSegments[0].departing_at.split("T");
  const arrival = flightSegments.slice(-1)[0].arriving_at.split("T");
  var inititalTime = moment(resBox.slices[0].segments[0].arriving_at);
  var finalTime = moment(resBox.slices.at(-1).segments.at(-1).departing_at);
  // console.log(finalTime.diff(inititalTime, "days"));
  const flightCodes = flightSegments
    .filter(
      (item) =>
        item.marketing_carrier_flight_number || item.marketing_carrier.iata_code
    )
    .map(
      (item) =>
        item.marketing_carrier.iata_code + item.marketing_carrier_flight_number
    );

  const formatDuration = (duration) => {
    const regex = /P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?/;
    const [, days, hours, minutes] = duration.match(regex).map(Number);
    let formatted = "";
    if (days) {
      formatted += `${days}d`;
    }
    if (hours) {
      formatted += `${hours}h`;
    }
    if (minutes) {
      formatted += `${minutes}m`;
    }
    return formatted;
  };

  return (
    <ResultBox
      flex="row-col"
      changeSize="sm"
      style={!showPrice ? { boxShadow: "none" } : {}}
      uniqueClassname={!showPrice && "border"}
    >
      <div className="flight-details flex flex-col flex-grow gap-3 w-auto sm:w-4/5 m-5">
        <div className="text-center uppercase">Initial Flight Information</div>
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center">
          {/* <Accordion className="flight-accordion flex-shrink flex-grow">
            <AccordionSummary
              aria-controls={`${uniqueName}-control-panel`}
              expandIcon={<KeyboardArrowDownOutlined />}
            > */}
          <div className="flex flex-col md:flex-row flex-grow gap-3">
            <div className="flight-logo mb-10 md:mb-0 self-center md:self-start">
              <img
                src={resBox?.owner ? resBox.owner.logo_symbol_url : resBox.img}
                alt=""
                className="object-contain"
                style={{ height: "5rem", width: "7rem" }}
              />
            </div>
            <div className="flex-grow grid grid-cols-3 sm:px-3 items-center">
              <div className="col-span-3 flex flex-row flex-wrap gap-3 justify-between items-center">
                <div className="font-semibold text-base lowercase">
                  {depart[1].slice(0, -3)} - {arrival[1].slice(0, -3)}
                </div>
                <div className="box-border font-semibold text-sm text-right text-nowrap">
                  {resBox.slices[0].segments.length > 1
                    ? resBox.slices[0].segments.length - 1 + " Stops"
                    : "Direct"}
                </div>
                <div className="font-medium text-base text-right lowercase">
                  {formatDuration(resBox.slices[0].duration)}
                </div>
              </div>
              <div className="col-span-3 flex flex-row flex-wrap justify-between items-center">
                <div className="font-normal text-sm capitalize text-100">
                  <div>{resBox.owner.name} .</div>{" "}
                  <div>{flightCodes.join(", ")}</div>
                </div>
                <div className="font-normal text-sm text-100 text-right">
                  {resBox.slices[0].origin.iata_code +
                    "-" +
                    resBox.slices[0].destination.iata_code}
                </div>
              </div>
            </div>
          </div>
          {/* </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}> */}
          {/* </AccordionDetails>
          </Accordion> */}
          {showPrice && (
            <>
              <div className="flight-cost sm:w-28 mt-3 self-stretch text-right sm:self-start">
                <div className="flex flex-row gap-2 sm:gap-0 justify-center sm:justify-normal items-center sm:items-stretch sm:flex-col font-bold text-xl lg:text-2xl primary-500">
                  <span className="font-medium text-xs text-100">
                    starting from
                  </span>
                  {convert(resBox.total_amount).toFixed(2)}
                  <span className="font-regular text-base text-black">
                    {/* {resBox.base_currency} */}
                    {currency}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <hr />
        <div className="flex flex-col text-sm gap-5">
          {resBox.slices.map((slice, j) => {
            return (
              <>
                <div
                  className="flex flex-row justify-center items-center gap-2 text-base"
                  key={j}
                >
                  <div>{slice.origin.city_name}</div>
                  <div>
                    <GoDash />
                  </div>
                  <div>{slice.destination.city_name}</div>
                </div>
                {slice.segments.map((option, i) => {
                  let diffStr = "";
                  if (i + 1 < slice.segments.length) {
                    const departing = moment(option.arriving_at);
                    const arriving = moment(slice.segments[i + 1].departing_at);
                    let diff = arriving.diff(departing, "seconds");
                    let min = Math.floor(diff / 60);
                    let hours = Math.floor(min / 60);
                    min = min - hours * 60;
                    diffStr = hours + "h" + (min ? min + "m" : "");
                  }
                  const departDate = moment(option.departing_at);
                  const arriveDate = moment(option.arriving_at);
                  return (
                    <>
                      <div
                        className="flex flex-row justify-center flex-wrap"
                        key={i}
                      >
                        <div className="flex-grow sm:w-1/6 mb-3 sm:mb-0 justify-center flex gap-4 sm:gap-0 sm:flex-col">
                          Flight {option.marketing_carrier_flight_number}
                          <span className="lowercase font-medium">
                            {option.duration.slice(2)}
                          </span>
                        </div>
                        <div className="flex flex-col flex-grow">
                          <div className="flex flex-row justify-start sm:gap-7">
                            <div className="font-semibold w-4/12 sm:w-2/12">
                              {departDate.format("h:mm a")}
                            </div>
                            <div className="">
                              {departDate.format("ddd, MMM D")}
                            </div>
                            <div className="w-5/12 flex flex-row flex-wrap justify-start gap-1">
                              <div>{option.origin.city_name}</div>
                              <div>({option.origin.iata_code})</div>
                            </div>
                          </div>
                          <div className="flex flex-row justify-start sm:gap-7">
                            <div className="font-semibold w-4/12 sm:w-2/12">
                              {arriveDate.format("h:mm a")}
                            </div>
                            <div className="">
                              {arriveDate.format("ddd, MMM D")}
                            </div>
                            <div className="w-5/12 flex flex-row flex-wrap justify-start gap-1">
                              <div>{option.destination.city_name}</div>
                              <div>({option.destination.iata_code})</div>
                            </div>
                          </div>
                        </div>
                        <div className="sm:w-1/5 text-end mt-3 sm:mt-0 capitalize">
                          Cabin: {slice.fare_brand_name}
                          {/* {slice.fare_brand_name
                            ? slice.fare_brand_name
                            : formData.cabin} */}
                        </div>
                      </div>
                      {i + 1 < slice.segments.length && (
                        <div className="text-center text-xs font-medium">
                          <span>{diffStr}</span> Layover in{" "}
                          {option.destination.city_name}
                        </div>
                      )}
                    </>
                  );
                })}
                <div className="">
                  Total Trip Time (including layovers) :{" "}
                  {formatDuration(slice.duration)}
                </div>
              </>
            );
          })}
        </div>
        {showPrice && (
          <>
            <hr />
            <div className="flight-button">
              <Button3
                style={{ fontSize: 14 }}
                onClick={async (e) => {
                  try {
                    const res = await paymentIntent({
                      offerId: resBox.id,
                      currency: "GBP",
                    });
                    console.log(res);
                    const pit = res.data.data.id;
                    const client_token = res.data.data.client_token;
                    navigate(`/checkout/${client_token}/${pit}/${resBox.id}`, {
                      state: { payment: JSON.stringify(res.data.data) },
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                disabled={intentLoading}
              >
                {intentLoading ? (
                  <CircularProgress
                    style={{ fontSize: 14, color: "white" }}
                    size={"14px"}
                  />
                ) : (
                  <>Book Deal</>
                )}
              </Button3>
            </div>
          </>
        )}
      </div>
    </ResultBox>
  );
};

const ShowHotels = ({ results, resBox, uniqueName }) => {
  const navigate = useNavigate();
  const [getRates, ratesLoading] = useAPI(APIS.hotelRates);
  const [createQuote, quoteRating] = useAPI(APIS.hotelQuote);
  const [rates, setRates] = useState([]);
  const [paymentIntent, intentLoading] = useAPI(APIS.hotelPayment);
  const net = resBox?.price - resBox?.price * (resBox.discount / 100);

  return (
    <Accordion className="bg-transparent rounded-full overflow-hidden border-none shadow-none">
      <ResultBox
        padding="p-0"
        justify="justify-start"
        uniqueClassname="overflow-visible"
      >
        <AccordionSummary
          expandIcon={<></>}
          aria-controls="panel1-content"
          id="panel1-header"
          className="rounded-full flex-grow overflow-hidden"
        >
          <img
            src={resBox?.accommodation?.photos[0]?.url}
            alt=""
            className="w-1/4 md:w-1/2 lg:w-72 lg:h-64 object-cover"
          />
          <div className="flex-grow flex flex-col p-4 gap-4 justify-evenly">
            <div className="flex flex-col gap-2">
              <div className="hotel-heading font-semibold text-xl sm:text-3xl">
                {resBox?.accommodation?.name}
              </div>
              {/* <div className="hotel-distance font-normal text-sm sm:text-base">
            {resBox?.dist}km from {resBox?.place}
          </div> */}
              <div className="flex flex-row items-center gap-2">
                <div className="rating font-semibold text-xs sm:text-sm flex flex-row flex-wrap gap-1 py-1 px-2 items-center">
                  {resBox?.accommodation?.rating}
                  <Star sx={{ fontSize: 16, mb: "2px" }} />
                </div>
                <div className="font-normal text-xs sm:text-sm">
                  ({resBox?.accommodation?.review_score} Reviews)
                </div>
              </div>
              <div className="hotel-amenities flex flex-row gap-4">
                {/* {resBox.accommodation?.amenities.map((val, i) => (
              <span key={i} className="font-normal text-xs sm:text-sm">
                {val}
              </span>
            ))} */}
              </div>
            </div>
            <div className="flex flex-row md:flex-col lg:flex-row justify-between items-center md:items-stretch lg:items-center">
              <div className="flex flex-col gap-1 flex-shrink">
                <div className="flex flex-row items-center flex-wrap gap-1 sm:gap-3">
                  <div className="hotel-net-amount primary-500 font-semibold text-xl sm:text-3xl">
                    <span style={{ marginRight: "1rem" }}>GBP</span>
                    {resBox?.accommodation?.cheapest_rate_total_amount}
                  </div>
                  {/* <div className="hotel-actual-amount font-normal text-sm sm:text-xl line-through text-100">
                C${resBox?.price != net ? resBox?.price : null}
                C$ {resBox?.accommodation?.cheapest_rate_total_amount}
              </div>  */}
                  <div
                    className="hotel-discount font-medium text-sm sm:text-xl"
                    style={{ color: "var(--orange)" }}
                  >
                    {resBox?.discount > 0 ? resBox?.discount + "% off" : null}
                  </div>
                </div>
                <div className="font-normal text-xs sm:text-base text-100">
                  per room per night
                </div>
              </div>
              {/* <Button2
              classes="font-medium text-xs sm:text-base sm:px-4"
              style={{ background: "var(--primary-500)" }}
              width="auto"
              onClick={() => {
                // navigate("/checkout_", { state: { resBox } });
              }}
            >
              Check Rates
            </Button2> */}

              <Button2
                classes="font-medium text-xs sm:text-base sm:px-4"
                style={{ background: "var(--primary-500)" }}
                width="auto"
                onClick={() => {
                  getRates({ search_id: resBox?.id }).then((res) => {
                    // console.log(res);
                    // console.log(res?.data?.data?.accommodation?.rooms);
                    if (res?.data?.data?.accommodation?.rooms) {
                      console.log(true);
                      let temp = res?.data?.data?.accommodation?.rooms;
                      console.log(temp);
                      setRates(temp);
                    } else console.log(false);
                  });
                }}
              >
                Show Rates
              </Button2>
            </div>
          </div>
        </AccordionSummary>
      </ResultBox>
      <AccordionDetails className="bg-transparent" sx={{ mt: 5 }}>
        {rates?.length > 0 &&
          rates.map((room, roomIndex) => {
            return (
              <div key={roomIndex} className="flex flex-col gap-3 mb-10">
                <div className="flex flex-row justify-between">
                  <div className="text-lg font-semibold underline">
                    {room.name}
                  </div>
                  <div className="flex flex-row justify-end gap-2">
                    {room?.rates.map((rate, rateIndex) => {
                      return (
                        <Button2
                          classes="font-medium text-xs sm:text-base sm:px-4"
                          style={{ background: "var(--primary-500)" }}
                          width="auto"
                          onClick={() => {
                            createQuote({ rate_id: rate?.id }).then((res) => {
                              console.log(res);
                              if (res?.data?.data?.id) {
                                const quote = res?.data?.data;
                                Swal.fire({
                                  title: "Quote Created",
                                  text: "Do you confirm to book this Room?",
                                  icon: "question",
                                  confirmButtonText: "Yes",
                                  confirmButtonColor: "var(--primary-500)",
                                  showCancelButton: true,
                                  cancelButtonText: "No",
                                  cancelButtonColor: "var(--text-100)",
                                }).then((prompt) => {
                                  if (prompt.isConfirmed) {
                                    paymentIntent({
                                      quote: quote,
                                    })
                                      .then((res) => {
                                        console.log(res);
                                        const pit = res.data.data.id;
                                        const client_token =
                                          res.data.data.client_token;
                                        navigate("/checkout_", {
                                          state: {
                                            resBox,
                                            quote,
                                            pit,
                                            client_token,
                                          },
                                        });
                                      })
                                      .catch((error) => {
                                        console.error(error);
                                        navigate("/checkout_", {
                                          state: {
                                            resBox,
                                            quote,
                                          },
                                        });
                                      });
                                  }
                                });
                              } else {
                                Swal.fire(
                                  "The room is not available for booking.",
                                  "",
                                  "warning"
                                );
                              }
                            });
                          }}
                        >
                          {Math.round(rate.public_amount)}{" "}
                          {rate.public_currency}
                        </Button2>
                      );
                    })}
                  </div>
                </div>
                <div className="w-full flex flex-row flex-wrap gap-2">
                  {room?.photos.map((photo, photoIndex) => {
                    return (
                      <img
                        src={photo.url}
                        alt=""
                        key={photoIndex}
                        className="w-1/6 object-cover"
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
      </AccordionDetails>
    </Accordion>
  );
};

const ShowCarRentals = ({ resBox, uniqueName }) => {
  const net = resBox.price - resBox.price * (resBox.discount / 100);
  return (
    <ResultBox padding="p-0" justify="justify-start">
      <div className="flight-logo mt-2 ml-3 self-center">
        <img src={resBox.img} alt="" className="w-1/3 object-cover" />
      </div>
      {/* <img src={resBox.img} alt="" className="w-1/4 md:w-1/2 lg:w-72 lg:h-64" /> */}
      <div className="flex-grow flex flex-col p-4 gap-4 justify-evenly">
        <div className="flex flex-col gap-2">
          <div className="hotel-heading font-semibold text-xl sm:text-3xl">
            {resBox.name}
          </div>
          <div className="hotel-distance font-light text-sm sm:text-base">
            or similar{" "}
            <span>
              <Circle sx={{ fontSize: 6 }} />
            </span>{" "}
            {resBox.type}{" "}
            <span>
              <Circle sx={{ fontSize: 6 }} />
            </span>{" "}
            {resBox.size}
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="rating font-semibold text-xs sm:text-sm flex flex-row flex-wrap gap-1 py-1 px-2 items-center">
              {resBox.rating}
              <Star sx={{ fontSize: 16, mb: "2px" }} />
            </div>
            <div className="font-normal text-xs sm:text-sm">
              ({resBox.reviews} Reviews)
            </div>
          </div>
          <div className="hotel-amenities flex flex-row gap-1">
            {resBox.amenities.map((val, i) => (
              <Chip
                key={i}
                label={val}
                className="font-normal text-xs sm:text-sm"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row md:flex-col lg:flex-row justify-between items-center md:items-stretch lg:items-center">
          <div className="flex flex-col gap-1 flex-shrink">
            <div className="flex flex-row items-center flex-wrap gap-1 sm:gap-3">
              <div className="hotel-net-amount primary-500 font-semibold text-xl sm:text-3xl">
                C${resBox.price}{" "}
                <span className="font-light text-xs text-100">Total</span>
              </div>
            </div>
            <div className="font-normal text-xs sm:text-base">
              Free Cancellation
            </div>
          </div>
          <Button2
            classes="font-medium text-xs sm:text-base sm:px-4"
            style={{ background: "var(--primary-500)" }}
            width="auto"
          >
            Book Now
          </Button2>
        </div>
      </div>
    </ResultBox>
  );
};

const Tabs = ({ tabItems, uniqueName, type }) => {
  const width = 100 / tabItems.length;
  const content = [];
  tabItems.map((item, i) => {
    content.push(
      <ResultBox key={i} flex="col">
        <div className="overflow-hidden rounded-xl">
          <img src={item.img} alt="" />
        </div>
        <div className="text-center font-medium text-xl">{item.heading}</div>
        <div className="text-100 text-center font-normal text-base">
          from C${item.cost}
        </div>
      </ResultBox>
    );
  });
  if (type === "car-rental") {
    return <Slideshow items={content} />;
  } else {
    return (
      <>
        {tabItems.map((item, index) => {
          let border =
            index + 1 < tabItems.length ? "border-solid border-r" : "";
          return (
            <div
              className={`result-numbers-item cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-l-2xl flex flex-col p-3 sm:pl-9 ${border}`}
              key={index}
              style={{ width: `${width}%` }}
              aria-label={`result-container-${uniqueName}`}
              onClick={item.onClick}
              // onClick={(evt) => {
              //   const targetClass =
              //     evt.currentTarget.getAttribute("aria-label");
              //   const targetDiv = document.querySelector(
              //     `.search-results > .${targetClass}-${index}`
              //   );

              //   const resContainer = Array.from(
              //     document.getElementsByClassName("result-container")
              //   );
              //   resContainer.map((ele) => {
              //     ele.classList.add("hidden");
              //   });
              //   targetDiv.classList.remove("hidden");
              // }}
            >
              <div className="font-semibold text-base text-black">
                {item.heading}
              </div>
              <div className="result-numbers-item-sub font-normal text-sm">
                {type == "flight" ? item.sub : ""}
              </div>
            </div>
          );
        })}
      </>
    );
  }
};

const ResultNumbers = ({
  uniqueName,
  items,
  // items,
  tabItems,
  type,
  loading = true,
}) => {
  const [tab, changeTab] = useState({});
  const [results, sortedResults] = useState(items);
  // useEffect(() => {
  //   if (items) {
  //     sortedResults(items);
  //   }
  // }, [items]);
  useEffect(() => {
    if (items) {
      sortedResults(items);
    }
    // console.log("The items is: ", results);
    console.log(results);
  }, [items]);
  return (
    <>
      {type == "car-rental" ? (
        <div className="my-6 w-auto car-rental-tabs">
          <Tabs
            tabItems={tabItems}
            type={type}
            uniqueName={uniqueName}
            // changeTab={changeTab}
          />
        </div>
      ) : (
        <ResultBox>
          <Tabs
            tabItems={tabItems}
            type={type}
            uniqueName={uniqueName}
            // changeTab={changeTab}
          />
        </ResultBox>
      )}
      {loading || results === undefined ? (
        <div className="mx-auto mt-8 h-40">
          <CircularProgress />
        </div>
      ) : (
        <ResultCount
          showing={results.length}
          total={results.length}
          type={type == "flight" ? type : "places"}
        />
      )}
      <div className="search-results flex flex-col gap-8">
        <div
          className={`flex flex-col gap-8 result-container result-container-${uniqueName}`}
        >
          {Array.isArray(results) ? (
            results.map((resBox, index) => {
              return type == "flight" ? (
                <ShowFlights
                  resBox={resBox}
                  uniqueName={`${uniqueName}-${index}`}
                  key={index}
                />
              ) : type == "hotel" ? (
                <ShowHotels
                  // results={results}
                  resBox={resBox}
                  uniqueName={uniqueName}
                  key={index}
                />
              ) : type == "car-rental" ? (
                <ShowCarRentals
                  resBox={resBox}
                  uniqueName={uniqueName}
                  key={index}
                />
              ) : null;
            })
          ) : (
            <>{null}</>
          )}
        </div>
      </div>
    </>
  );
};

export {
  Section,
  ShadowBox,
  FilterCorner,
  Filter,
  FilterSlider,
  FilterRadio,
  FilterCheckbox,
  ResultContainer,
  ResultBox,
  ResultNumbers,
};
