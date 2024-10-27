import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddressForm from "./AddressForm";
import getCheckoutTheme from "./getCheckoutTheme";
import Info from "./Info";
import InfoMobile from "./InfoMobile";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import ToggleColorMode from "./ToggleColorMode";
import { useLocation, useNavigate } from "react-router-dom";
import FlightLogo from "../../assets/img/logos/FlightSavior.png";
import { APIS, useAPI } from "../../api/config";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    ></Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

const steps = ["Personal Info", "Payment details", "Review your order"];

const logoStyle = {
  width: "140px",
  height: "56px",
  marginLeft: "-4px",
  marginRight: "-8px",
};

export default function Checkout_temp() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [addressLine1, setAddressLine1] = React.useState();
  const [addressLine2, setAddressLine2] = React.useState();
  const [city, setCity] = React.useState();
  const [state, setState] = React.useState();
  const [zip, setZip] = React.useState();
  const [country, setCountry] = React.useState();

  const [cardNumber, setCardNumber] = React.useState();
  const [cvv, setCvv] = React.useState();
  const [name, setName] = React.useState();
  const [expiration, setExpiration] = React.useState();

  const [createBooking, bookingLoading] = useAPI(APIS.createHotelBooking);
  const [user, setUser, getUser] = React.useContext(UserContext);

  const navigate = useNavigate();

  const location = useLocation();
  const data = location?.state?.resBox;
  const { quote } = location?.state;
  let quoteTemp = {
    stay_special_requests: "",
    quote_id: quote.id,
    phone_number: "",
    guests: data.guests.map(() => {
      return { given_name: "", family_name: "", born_on: "" };
    }),
    email: "",
    accommodation_special_requests: "",
  };
  const [quoteObject, setQuoteObject] = React.useState(quoteTemp);

  function getStepContent(
    step,
    setFirstName,
    setLastName,
    setAddressLine1,
    setAddressLine2,
    setCity,
    setState,
    setZip,
    setCountry
  ) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            setFirstName={setFirstName}
            setLastName={setLastName}
            setAddressLine1={setAddressLine1}
            setAddressLine2={setAddressLine2}
            setCity={setCity}
            setState={setState}
            setZip={setZip}
            setCountry={setCountry}
            guestList={data.guests}
            quoteObject={quoteObject}
            setObject={setQuoteObject}
          />
        );
      case 1:
        return (
          <PaymentForm
            data_={data}
            setCardNumber_={setCardNumber}
            setCvv_={setCvv}
            setName_={setName}
            setExpiration_={setExpiration}
            paymentAmount={data.cheapest_rate_total_amount}
            paymentCurrency={data.cheapest_rate_currency}
          />
        );
      case 2:
        return (
          <Review
            firstName={firstName}
            lastName={lastName}
            addressLine1={addressLine1}
            addressLine2={addressLine2}
            city={city}
            state={state}
            zip={zip}
            country={country}
            data={data}
            name={name}
            cardNumber={cardNumber}
            cvv={cvv}
            expiration={expiration}
            price={data?.cheapest_rate_total_amount}
            quote={quoteObject}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const setMetaData = async (send) => {
    return new Promise((resolve, reject) => {
      quoteObject.someData = send;
      setMetaData(quoteObject);
      resolve(quoteObject);
    });
  };

  const confirmBooking = async () => {
    try {
      // const received = await setMetaData(quote);
      let tempData = quoteObject;
      tempData.someData = quote;
      console.log(tempData);
      const header = user && { "x-auth-token": user?.data.token };
      const res = await createBooking({ body: tempData, headers: header });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (activeStep == steps.length) {
      Swal.fire({
        title: " Thankyou!",
        text: "Your hotel has been booked",
        icon: "success",
        showConfirmButton: false,
        timer: 4000,
      }).then(() => navigate(`/`));
    }
  }, [activeStep]);

  React.useEffect(() => {
    console.log(data.cheapest_rate_total_amount);
    console.log(data.cheapest_rate_currency);
  }, []);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleNext = () => {
    console.log(activeStep);
    if (activeStep + 1 === 3) confirmBooking();
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
      <CssBaseline />
      <Grid container>
        <Grid
          item
          xs={12}
          sm={5}
          lg={4}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 4,
            px: 10,
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              height: 150,
            }}
          >
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              component="a"
              href="/"
              sx={{ ml: "-8px" }}
            >
              Back to
              <img
                src={FlightLogo}
                style={{
                  width: "136px",
                  height: "15px",
                  marginLeft: "7px",
                }}
                alt="Sitemark's logo"
              />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info totalPrice={quote?.total_amount} data={data} />
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={7}
          lg={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "flex-end" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button
                startIcon={<ArrowBackRoundedIcon />}
                component="a"
                href="/"
                sx={{ alignSelf: "start" }}
              >
                Back to
                <img
                  src={FlightLogo}
                  style={{
                    width: "136px",
                    height: "15px",
                    marginLeft: "7px",
                  }}
                  alt="Sitemark's logo"
                />
              </Button>
              {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexGrow: 1,
                height: 150,
              }}
            >
              {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
              <Box sx={{ marginTop: "6rem" }}></Box>
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{
                  width: "100%",
                  height: 40,
                }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-child": { pl: 0 },
                      ":last-child": { pr: 0 },
                    }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card
            sx={{
              display: { xs: "flex", md: "none" },
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                ":last-child": { pb: 2 },
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  {activeStep >= 2 ? "$144.97" : "$134.98"}
                </Typography>
              </div>
              <InfoMobile
                totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"}
              />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              // maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: "flex", md: "none" } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ":first-child": { pl: 0 },
                    ":last-child": { pr: 0 },
                    "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{
                      ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                {/* <Typography variant="h1">📦</Typography> */}
                <Typography variant="h5">
                  Thank you for your hotel booking from our website!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Your order number is
                  <strong>&nbsp;#140396</strong>.
                </Typography>
                {/* <Button
                                    variant="contained"
                                    sx={{
                                        alignSelf: 'start',
                                        width: { xs: '100%', sm: 'auto' },
                                    }}
                                >
                                    Go to my orders
                                </Button> */}
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(
                  activeStep,
                  setFirstName,
                  setLastName,
                  setAddressLine1,
                  setAddressLine2,
                  setCity,
                  setState,
                  setZip,
                  setCountry
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    justifyContent:
                      activeStep !== 0 ? "space-between" : "flex-end",
                    alignItems: "end",
                    flexGrow: 1,
                    gap: 1,
                    pb: { xs: 12, sm: 0 },
                    mt: { xs: 2, sm: 0 },
                    mb: "60px",
                  }}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{
                        display: { xs: "none", sm: "flex" },
                      }}
                    >
                      Previous
                    </Button>
                  )}

                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{
                        display: { xs: "flex", sm: "none" },
                      }}
                    >
                      Previous
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    sx={{
                      width: { xs: "100%", sm: "fit-content" },
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Book" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
      <ToggleCustomTheme
        toggleCustomTheme={toggleCustomTheme}
        showCustomTheme={showCustomTheme}
      />
    </ThemeProvider>
  );
}
