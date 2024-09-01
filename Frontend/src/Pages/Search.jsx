import { useLocation, useParams } from "react-router-dom";
import {
  FlightForm,
  CarRentalForm,
  HotelForm,
} from "../Components/Common/SearchForm";
import {
  Filter,
  FilterCorner,
  FilterRadio,
  FilterSlider,
  ResultBox,
  ResultContainer,
  ResultNumbers,
  Section,
  ShadowBox,
} from "../Components/UnCommon/SearchLayouts";
import { Box, Radio, RadioGroup } from "@mui/material";
import Slider from "@mui/material/Slider";
// material ui icons
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useContext, useEffect, useState } from "react";
import { useAPI, APIS } from "../api/config";
import moment from "moment";
import { HotelContext, HotelProvider } from "../context/HoteContext";
import axios from "axios";
import searching from "freegeolocate";
import Swal from "sweetalert2";

const LineSeparator = () => {
  return (
    <span
      style={{
        display: "block",
        marginLeft: "1.5rem",
        width: "auto",
        marginTop: "3rem",
        marginBottom: "3rem",
        border: "1px solid #8080804d",
      }}
    ></span>
  );
};

const CustomFilterTimeComponent = ({
  arriving,
  departing,
  handleArrive,
  handleDepart,
  terminals,
}) => {
  // console.log(terminals[0]);
  return (
    <>
      <Box>
        <h3>
          <b>Flight Times</b>
        </h3>
        <Box sx={{ marginTop: "1rem" }}>
          <Box>
            <FlightLandIcon sx={{ marginRight: "0.5rem" }} />
            <span>
              Flying from {terminals[0]?.city_name && terminals[0].city_name} (
              {terminals[0]?.iata_city_code && terminals[0].iata_city_code})
            </span>
          </Box>
          <Box sx={{ marginTop: "0.7rem" }}>
            <AccessTimeIcon sx={{ marginRight: "0.5rem" }} />
            Departing:{" "}
            <b>
              {moment(departing[0], "H").format("h:mm A")} -{" "}
              {moment(departing[1], "H").format("h:mm A")}
            </b>
          </Box>
          <Box sx={{ width: 300, marginTop: "0.6rem" }}>
            <Slider
              value={departing}
              onChange={handleDepart}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={24}
            />
          </Box>
        </Box>
        <Box sx={{ marginTop: "0.5rem" }}>
          <Box>
            <FlightLandIcon sx={{ marginRight: "0.5rem" }} />
            <span>
              Flying to {terminals[1]?.city_name && terminals[1].city_name} (
              {terminals[1]?.iata_city_code && terminals[1].iata_city_code})
            </span>
          </Box>
          <Box sx={{ marginTop: "0.7rem" }}>
            <AccessTimeIcon sx={{ marginRight: "0.5rem" }} />
            Arriving:{" "}
            <b>
              {moment(arriving[0], "H").format("h:mm A")} -{" "}
              {moment(arriving[1], "H").format("h:mm A")}
            </b>
          </Box>
          <Box sx={{ width: 300, marginTop: "0.6rem" }}>
            <Slider
              value={arriving}
              onChange={handleArrive}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={24}
            />
          </Box>
        </Box>
        {/* <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
          Display arrival times
        </h3>
        <span
          style={{
            display: "block",
            width: "300px",
            borderBottom: "1px dotted black",
          }}
        ></span> */}
        {/* <Box sx={{ marginTop: "1rem" }}>
            <h3>
              <b>Connection Time</b>
            </h3>
            <Box>
              <span style={{ marginRight: "2rem" }}>Show Layovers up to: </span>
              <select
                style={{
                  minWidth: "100px",
                  backgroundColor: "#d3d3d3",
                  padding: "0.3rem",
                }}
              >
                <option value="">25 hours</option>
                <option value="">A</option>
              </select>
            </Box>
          </Box> */}
      </Box>
    </>
  );
};

const CustomFilterDateComponent = ({ offers, setDisplayOffers }) => {
  return (
    <>
      <h3>
        <b>Dates</b>
      </h3>
      <Box>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Show prices with alternate dates"
          />
        </FormGroup>
      </Box>
    </>
  );
};

const CustomFilterAirportComponent = ({ offers, setDisplayOffers }) => {
  return (
    <>
      <Box>
        <h3>
          <b>Airports</b>
        </h3>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Show alternate/nearby airports"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="same departuring/returning airport"
          />
        </FormGroup>
      </Box>
      <Box sx={{ marginTop: "1rem" }}>
        <h3>Arriving at Dubai</h3>
        <FormGroup>
          <Box>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="(DXB) Dubai"
            />
            <span style={{ marginLeft: "3rem" }}>CAD 572</span>
          </Box>
          <Box>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="(DXB) Dubai"
            />
            <span style={{ marginLeft: "3rem" }}>CAD 572</span>
          </Box>
        </FormGroup>
      </Box>
      <Box sx={{ marginTop: "1rem" }}>
        <h3>Layover Airports</h3>
        <FormGroup>
          <Box>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="(DXB) Dubai"
            />
            <span style={{ marginLeft: "3rem" }}>CAD 572</span>
          </Box>
          <Box>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="(DXB) Dubai"
            />
            <span style={{ marginLeft: "3rem" }}>CAD 572</span>
          </Box>
        </FormGroup>
      </Box>
    </>
  );
};

const CustomFilterAirLineComponent = ({
  offers,
  selectedAirlines,
  filterFunction,
}) => {
  const airlineNames = Array.from(
    new Set(offers.map((item) => item.owner.name))
  );
  // console.log(airlineNames);
  return (
    <>
      <Box>
        <h3>
          <b>AirLines</b>
        </h3>
        <FormGroup>
          {airlineNames.map((item, i) => {
            return (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={!selectedAirlines.includes(item)}
                    onChange={() => filterFunction(item)}
                  />
                }
                label={item}
              />
            );
          })}
        </FormGroup>
      </Box>
    </>
  );
};

const CustomFilterStopsComponent = ({ filterFunction }) => {
  const [stop, setStops] = useState(-1);
  return (
    <>
      <Box>
        <h3>
          <b>Stops</b>
        </h3>
        <RadioGroup
          id="flight-radio"
          value={stop}
          onChange={(e) => setStops(e.target.value)}
        >
          {/* <div className="flex flex-row justify-between"> */}
          <div className="flex flex-col">
            <FormControlLabel
              value={-1}
              control={<Radio onChange={() => filterFunction(null)} />}
              label="All"
            />
            <FormControlLabel
              value={0}
              control={<Radio onChange={() => filterFunction(1)} />}
              label="Direct"
            />
          </div>
          <div className="flex flex-col">
            <FormControlLabel
              value={1}
              control={<Radio onChange={() => filterFunction(2)} />}
              label="1 Stop"
            />
            <FormControlLabel
              value={2}
              control={<Radio onChange={() => filterFunction(3)} />}
              label="2+ Stops"
            />
          </div>
          {/* </div> */}
        </RadioGroup>
      </Box>
    </>
  );
};

const SearchFlight = () => {
  const location = useLocation();
  const { flights } = location.state;
  const formData = JSON.parse(location.state.formData);
  const [getOffers, loading] = useAPI(APIS.listOffers);
  const [offers, setOffers] = useState([]);
  const [displayOffers, setDisplayOffers] = useState([]);
  const [selectedStops, setSelectedStops] = useState(null); // State for selected stops (null for all)
  const [selectedAirlines, setSelectedAirlines] = useState([]); // State for selected airlines
  const [arrivalTimeRange, setArrivalTimeRange] = useState([0, 24]); // State for arrival time range (0 to 24 hours)
  const [departureTimeRange, setDepartureTimeRange] = useState([0, 24]);
  const [extremeTerminals, setExtremeTerminals] = useState([]);
  const [arrivingAddress, setArrivingAddress] = useState("");
  const [departingAddress, setDepartingAddress] = useState("");

  const getFlights = async (flightData) => {
    try {
      // console.clear();
      // console.log(formData);
      // console.log(flightData);

      const res = await getOffers(flightData);
      console.log(res);
      if (res?.response?.status === 400) {
        let errors = res.response.data.errors;
        Swal.fire({
          title: errors[0].title,
          text: errors[0].message,
          icon: "error",
          showConfirmButton: false,
          timer: 8000,
        });
      }
      if (res?.data?.offers.length > 0) {
        console.log(res.data.offers);
        setOffers(res.data.offers);
        const temp_offer = res.data.offers[0].slices;

        let departingCity =
          temp_offer[0].origin.city_name +
          " " +
          `(${temp_offer[0].origin.iata_code})`;
        const departingCountry = await axios.get(
          `https://restcountries.com/v3.1/alpha/${temp_offer[0].origin.iata_country_code}?fields=name`
        );
        // departingCity += ", " + departingCountry.data.name.common;
        setDepartingAddress(departingCity);

        let arrivingCity =
          temp_offer[0].destination.city_name +
          " " +
          `(${temp_offer[0].destination.iata_code})`;

        const arrivingCountry = await axios.get(
          `https://restcountries.com/v3.1/alpha/${
            temp_offer.at(-1).destination.iata_country_code
          }?fields=name`
        );
        // arrivingCity += ", " + arrivingCountry.data.name.common;
        setArrivingAddress(arrivingCity);

        setExtremeTerminals([
          temp_offer[0].origin,
          temp_offer.at(-1).destination,
        ]);
      } else {
        setOffers([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filterByStops = (flight) => {
    if (selectedStops === null) return true; // Show all flights if no stops selected
    if (selectedStops === 3)
      return flight.slices[0].segments.length >= selectedStops;
    return flight.slices[0].segments.length === selectedStops;
  };

  const filterByAirlines = (flight) => {
    if (selectedAirlines.length === 0) return true; // Show all flights if no airlines selected
    return !selectedAirlines.includes(flight.owner.name);
  };

  // Filter function for arrival time
  const filterByArrivalTime = (flight) => {
    const arrivalTime = moment(
      flight.slices.at(-1).segments.at(-1).arriving_at.split("T")[1],
      "HH:mm"
    ); // Parse arrival time string into moment object
    const minArrivalTime = moment()
      .startOf("day")
      .add(arrivalTimeRange[0], "hours");
    const maxArrivalTime = moment()
      .startOf("day")
      .add(arrivalTimeRange[1], "hours");
    return arrivalTime.isBetween(minArrivalTime, maxArrivalTime, null, "[]");
  };

  // Filter function for departure time
  const filterByDepartureTime = (flight) => {
    const departureTime = moment(
      flight.slices[0].segments[0].departing_at.split("T")[1],
      "HH:mm"
    ); // Parse departure time string into moment object
    const minDepartureTime = moment()
      .startOf("day")
      .add(departureTimeRange[0], "hours");
    const maxDepartureTime = moment()
      .startOf("day")
      .add(departureTimeRange[1], "hours");
    return departureTime.isBetween(
      minDepartureTime,
      maxDepartureTime,
      null,
      "[]"
    );
  };

  const handleStopsFilter = (stops) => {
    setSelectedStops(stops);
  };

  const handleAirlineFilter = (airline) => {
    if (selectedAirlines.includes(airline)) {
      setSelectedAirlines(selectedAirlines.filter((a) => a !== airline));
    } else {
      setSelectedAirlines([...selectedAirlines, airline]);
    }
  };

  // Handle slider change for arrival time range
  const handleArrivalTimeChange = (event, newValue) => {
    setArrivalTimeRange(newValue);
  };

  // Handle slider change for departure time range
  const handleDepartureTimeChange = (event, newValue) => {
    setDepartureTimeRange(newValue);
  };

  useEffect(() => {
    console.log("Location changed,");
    getFlights(JSON.parse(flights));
  }, [location]);

  useEffect(() => console.log(displayOffers), [displayOffers]);

  useEffect(() => {
    if (offers.length > 0)
      setDisplayOffers(
        offers
          .filter(filterByStops)
          .filter(filterByAirlines)
          .filter(filterByDepartureTime)
          .filter(filterByArrivalTime)
      );
    else setDisplayOffers([]);
  }, [offers]);

  useEffect(() => {
    if (offers.length > 0)
      setDisplayOffers(
        offers
          .filter(filterByStops)
          .filter(filterByAirlines)
          .filter(filterByDepartureTime)
          .filter(filterByArrivalTime)
      );
  }, [selectedStops, selectedAirlines, departureTimeRange, arrivalTimeRange]);

  const tabs = [
    {
      heading: "Cheapest",
      sub: "",
      onClick: () => {
        const sortedByAmount = [...displayOffers].sort(
          (a, b) => a.total_amount - b.total_amount
        );
        setDisplayOffers(sortedByAmount);
      },
    },
    {
      heading: "Best",
      sub: "",
    },
    {
      heading: "Quickest",
      sub: "",
      onClick: () => {
        const getTotalMinutes = (duration) => {
          const regex = /P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?/;
          const [, days, hours, minutes] = duration.match(regex).map(Number);
          return (days || 0) * 1440 + (hours || 0) * 60 + (minutes || 0);
        };

        const sortedArr = [...displayOffers].sort(
          (a, b) =>
            getTotalMinutes(a.slices[0].duration) -
            getTotalMinutes(b.slices[0].duration)
        );

        setDisplayOffers(sortedArr);
      },
    },
  ];

  return (
    <>
      <Section>
        <ShadowBox>
          <FlightForm
            roundTrip={formData.isRoundTrip}
            multiCity={formData.isMultiCity}
            multiCityFormList={formData.multiCityForms}
            multiCityObjectList={formData.multiCityObjects}
            cabinType={formData.cabin}
            fromCity={formData.from}
            fromCityText={formData.fromText}
            toCity={formData.to}
            toCityText={formData.toText}
            fromDateValue={formData.fromDate}
            toDateValue={formData.toDate}
            adultCount={formData.adults}
            childCount={formData.child}
          />
        </ShadowBox>
      </Section>
      <Section className="text-xl font-normal" style={{ padding: "1rem" }}>
        {!loading && (
          <>
            {offers.length > 0 && (
              <>
                From <span className="font-bold">{departingAddress}</span> to{" "}
                <span className="font-bold">{arrivingAddress}</span> -{" "}
                <span className="text-100 font-medium">
                  {moment(formData.fromDate).format("ddd, MMMM Do")}
                  {formData.toDate && (
                    <> to {moment(formData.toDate).format("ddd, MMMM Do")}</>
                  )}
                  , {moment().format("YYYY")}
                </span>
              </>
            )}
          </>
        )}
      </Section>
      <Section className="flex flex-col gap-6 md:gap-0 md:flex-row">
        <FilterCorner>
          <CustomFilterStopsComponent filterFunction={handleStopsFilter} />
          <LineSeparator />
          <CustomFilterTimeComponent
            arriving={arrivalTimeRange}
            handleArrive={handleArrivalTimeChange}
            departing={departureTimeRange}
            handleDepart={handleDepartureTimeChange}
            terminals={extremeTerminals}
          />
          {/* <LineSeparator />
          <CustomFilterDateComponent
            offers={offers}
            // setDisplayOffers={setDisplayOffers}
          /> */}
          {/* <LineSeparator /> */}
          {/* <CustomFilterAirportComponent
            offers={offers}
            // setDisplayOffers={setDisplayOffers}
          /> */}
          <LineSeparator />
          <CustomFilterAirLineComponent
            offers={offers}
            filterFunction={handleAirlineFilter}
            selectedAirlines={selectedAirlines}
          />
        </FilterCorner>
        <ResultContainer>
          <ResultNumbers
            uniqueName="flight-search-results"
            items={displayOffers && displayOffers}
            type="flight"
            tabItems={tabs}
            loading={loading}
          />
        </ResultContainer>
      </Section>
    </>
  );
};

const SearchHotel = () => {
  const { data } = useContext(HotelContext);
  const location = useLocation();
  const [hotelData, sethotelData] = useState();
  const hotelObject = location?.state?.hotelData;
  const { formData } = location.state;
  const [gettingHotels, hotelLoading] = useAPI(APIS.fetchHotels);

  const fetchHotels = async () => {
    try {
      const res = await gettingHotels({ hotel: hotelObject });
      if (res.status != 200) console.error(res);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotels().then((res) => sethotelData(res?.data));
    console.log(formData);
  }, [location]);

  const checkBox = [
    {
      id: "round-trip",
      label: "Round Trip",
      value: "rt",
    },
    {
      id: "on-way",
      label: "On Way",
      value: "onway",
    },
    {
      id: "multi-city",
      label: "Multi City",
      value: "mtcity",
    },
    {
      id: "flex-dates",
      label: "My Dates are Flexible",
      value: "dtflex",
    },
  ];

  const tabs = [
    {
      heading: "Hotels",
      places: 72,
    },
    {
      heading: "Motels",
      places: 51,
    },
    {
      heading: "Resorts",
      places: 66,
    },
  ];

  const resultNumbers = [
    {
      img: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Fairmount Royal York Hotel",
      place: "Toronto Island",
      dist: 2.38,
      rating: 4.7,
      reviews: 650,
      amenities: ["Reception", "Free Wifi"],
      price: 480,
      discount: 50,
    },
    {
      img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Fairmount Royal York Hotel",
      place: "Toronto Island",
      dist: 2.38,
      rating: 4.7,
      reviews: 650,
      amenities: ["Reception", "Free Wifi"],
      price: 480,
      discount: 50,
    },
    {
      img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Fairmount Royal York Hotel",
      place: "Toronto Island",
      dist: 2.38,
      rating: 4.7,
      reviews: 650,
      amenities: ["Reception", "Free Wifi"],
      price: 480,
      discount: 50,
    },
    {
      img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1498&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Fairmount Royal York Hotel",
      place: "Toronto Island",
      dist: 2.38,
      rating: 4.7,
      reviews: 650,
      amenities: ["Reception", "Free Wifi"],
      price: 480,
      discount: 50,
    },
  ];

  return (
    <>
      <Section>
        <ShadowBox>
          <HotelProvider>
            <HotelForm
              destText={formData.destText}
              adultCount={formData.adultCount}
              checkin_date={formData.checkin_date}
              checkout_date={formData.checkout_date}
              childCount={formData.childCount}
              lat={formData.lat}
              long={formData.long}
              roomCount={formData.roomCount}
            />
          </HotelProvider>
        </ShadowBox>
      </Section>
      <Section className="flex flex-col md:flex-row">
        <FilterCorner style={{ display: "none" }}>
          <Filter uniqueName="hotel-slider" heading="Price">
            <FilterSlider min={190} max={3200} symbol="C$" dist={100} />
          </Filter>
          <hr />
          <Filter uniqueName="hotel-checkbox-container" heading="Freebies">
            <FilterRadio list={checkBox} uniqueName="hotel-checkbox" />
          </Filter>
          <hr />
          <Filter uniqueName="hotel-checkbox-container" heading="Amenities">
            <FilterRadio list={checkBox} uniqueName="hotel-checkbox" />
          </Filter>
        </FilterCorner>
        <ResultContainer className="flex flex-col justify-stretch w-full flex-grow px-4 overflow-x-hidden">
          <ResultNumbers
            uniqueName="hotel-search-results"
            items={hotelData && hotelData.results}
            hotelData={hotelData && hotelData.results}
            tabItems={tabs}
            type="hotel"
            loading={hotelLoading}
          />
        </ResultContainer>
      </Section>
    </>
  );
};

const SearchCarRental = () => {
  const checkBox = [
    {
      id: "round-trip",
      label: "Round Trip",
      value: "rt",
    },
    {
      id: "on-way",
      label: "On Way",
      value: "onway",
    },
    {
      id: "multi-city",
      label: "Multi City",
      value: "mtcity",
    },
    {
      id: "flex-dates",
      label: "My Dates are Flexible",
      value: "dtflex",
    },
  ];

  const tabs = [
    {
      img: "https://www.usatoday.com/gcdn/-mm-/4b6f376283a6de68587ee9022cf54ac0a4a25ef1/c=0-482-5093-3360/local/-/media/2017/11/01/USATODAY/USATODAY/636451381173945916-AP17304589626111.jpg?width=3200&height=1809&fit=crop&format=pjpg&auto=webp",
      heading: "Small",
      cost: 32,
    },
    {
      img: "https://www.usatoday.com/gcdn/-mm-/4b6f376283a6de68587ee9022cf54ac0a4a25ef1/c=0-482-5093-3360/local/-/media/2017/11/01/USATODAY/USATODAY/636451381173945916-AP17304589626111.jpg?width=3200&height=1809&fit=crop&format=pjpg&auto=webp",
      heading: "Medium",
      cost: 36,
    },
    {
      img: "https://www.usatoday.com/gcdn/-mm-/4b6f376283a6de68587ee9022cf54ac0a4a25ef1/c=0-482-5093-3360/local/-/media/2017/11/01/USATODAY/USATODAY/636451381173945916-AP17304589626111.jpg?width=3200&height=1809&fit=crop&format=pjpg&auto=webp",
      heading: "Mini",
      cost: 42,
    },
    {
      img: "https://www.usatoday.com/gcdn/-mm-/4b6f376283a6de68587ee9022cf54ac0a4a25ef1/c=0-482-5093-3360/local/-/media/2017/11/01/USATODAY/USATODAY/636451381173945916-AP17304589626111.jpg?width=3200&height=1809&fit=crop&format=pjpg&auto=webp",
      heading: "SUV",
      cost: 34,
    },
    {
      img: "https://www.usatoday.com/gcdn/-mm-/4b6f376283a6de68587ee9022cf54ac0a4a25ef1/c=0-482-5093-3360/local/-/media/2017/11/01/USATODAY/USATODAY/636451381173945916-AP17304589626111.jpg?width=3200&height=1809&fit=crop&format=pjpg&auto=webp",
      heading: "Luxury",
      cost: 66,
    },
  ];

  const resultNumbers = [
    {
      img: "https://edgecast-img.yahoo.net/mysterio/api/94480F5CACF82B047654D9A7E02DBD08001D39B9A9FA75611AE309E869F00F3A/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD20NIS111A021001.jpg",
      name: "Nissan Rogue",
      place: "Toronto Island",
      type: "SUV",
      size: "midsize",
      dist: 2.38,
      rating: 4.7,
      reviews: 650,
      amenities: ["Reception", "Free Wifi"],
      price: 480,
      discount: 50,
    },
    {
      img: "https://blogmedia.dealerfire.com/wp-content/uploads/sites/376/2018/03/Color-Options-for-the-2018-Nissan-Versa-b1_o.jpg",
      name: "Nissan Versa Sedan",
      place: "Toronto Island",
      type: "4-5 doors",
      size: "compact",
      dist: 2.38,
      rating: 4.7,
      reviews: 650,
      amenities: ["Reception", "Free Wifi"],
      price: 480,
      discount: 50,
    },
    {
      img: "https://di-uploads-pod10.dealerinspire.com/daytonadodgechryslerjeepramfiat/uploads/2017/07/2017-Jeep-Wrangler-Unlimited.png",
      name: "Jeep Wrangler Unlimited",
      place: "Toronto Island",
      type: "SUV",
      size: "full-size",
      dist: 2.38,
      rating: 4.7,
      reviews: 650,
      amenities: ["Reception", "Free Wifi"],
      price: 480,
      discount: 50,
    },
    {
      img: "https://www.shutterstock.com/image-illustration/almaty-kazakhstanjune-2022-dodge-ram-600nw-2170756909.jpg",
      name: "Ram 1500",
      place: "Toronto Island",
      type: "Pickup Regular Cab",
      size: "premium",
      dist: 2.38,
      rating: 4.7,
      reviews: 650,
      amenities: ["Reception", "Free Wifi"],
      price: 480,
      discount: 50,
    },
  ];
  return (
    <>
      <Section>
        <ShadowBox>
          <CarRentalForm />
        </ShadowBox>
      </Section>
      <Section className="flex flex-col md:flex-row">
        <FilterCorner>
          <Filter uniqueName="hotel-slider" heading="Price">
            <FilterSlider min={190} max={3200} symbol="C$" dist={100} />
          </Filter>
          <hr />
          <Filter uniqueName="hotel-checkbox-container" heading="Freebies">
            <FilterRadio list={checkBox} uniqueName="hotel-checkbox" />
          </Filter>
          <hr />
          <Filter uniqueName="hotel-checkbox-container" heading="Amenities">
            <FilterRadio list={checkBox} uniqueName="hotel-checkbox" />
          </Filter>
        </FilterCorner>
        <ResultContainer>
          <ResultNumbers
            uniqueName="hotel-search-results"
            items={resultNumbers}
            tabItems={tabs}
            type="car-rental"
          />
        </ResultContainer>
      </Section>
    </>
  );
};

const Search = ({ component }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div style={{ background: "rgb(249, 249, 249)" }}>{component}</div>;
};

export { Search, SearchFlight, SearchHotel, SearchCarRental };
