import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAPI, APIS } from "../api/config";
import { useContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { DuffelAncillaries, DuffelPayments } from "@duffel/components";
import Swal from "sweetalert2";
import PassengerInformation from "./PassengerInformation";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Button, Checkbox, Form, Input } from "antd";
import { ShowFlights } from "../Components/UnCommon/SearchLayouts";
import axios from "axios";
import { FaCheck, FaLock } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { CurrencyContext } from "../context/CurrencyContext";
import { UserContext } from "../context/UserContext";

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const SideBox = ({ children, className = "", style = {} }) => {
  return (
    <div
      className={"border rounded-2xl p-5 flex flex-col gap-3 " + className}
      style={style}
    >
      {children}
    </div>
  );
};

export default function Checkout() {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    // if (panel == "panel1" && orderDetails?.passenger) newExpanded = false;
    if (panel == "panel2" && !orderDetails?.passenger) panel = "panel1";
    setExpanded(newExpanded ? panel : false);
  };

  const location = useLocation();
  const paymentObj = JSON.parse(location.state.payment);
  const { amount, currency } = paymentObj;
  const [curr, _, convert] = useContext(CurrencyContext);
  const [getOffer, offerLoading] = useAPI(APIS.offerData);
  const [getPayment, paymentLoading] = useAPI(APIS.confirmPayment);
  const [createOrder, orderLoading] = useAPI(APIS.createOrder);
  const { client_token, pit, offer_id } = useParams();
  const [offer, setOffer] = useState({});
  const [base, setBase] = useState(0.0);
  const [tax, setTax] = useState(0.0);
  const [markup, setMarkup] = useState(0.0);
  const [amountPayable, setAmountPayable] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const [arrivingAddress, setArrivingAddress] = useState("");
  const [departingAddress, setDepartingAddress] = useState("");
  const navigate = useNavigate();
  const [user, setUser, getUser] = useContext(UserContext);
  // const [total, setTotal] = useState(0.0);
  const setCost = async (offerId) => {
    return new Promise((resolve, reject) => {
      getOffer({ offerId: offerId })
        .then(
          (res) => {
            // console.log(res.data);
            if (res?.data) resolve(res.data);
            else reject("Offer rejected");
          },
          (rej) => {
            reject("Offer rejected");
          }
        )
        .catch((err) => {
          reject(err);
        });
    });
  };

  const setMetadata = async (body) => {
    return new Promise((resolve, reject) => {
      const { offer, payment_intent } = body;
      orderDetails.metadata = payment_intent;
      orderDetails.offer_data = offer;
      setOrderDetails(orderDetails);
      resolve(orderDetails);
    });
  };

  const confirmPayment = async () => {
    console.log(orderDetails);
    if (orderDetails?.payment?.amount == "") {
      orderDetails.payment.amount = amountPayable;
      setOrderDetails(orderDetails);
    }
    try {
      const pay = await getPayment({ id: pit });
      const metadata = await setMetadata({
        offer: offer,
        payment_intent: pit,
      });
      // console.log(pay);
      // console.log(metadata);
      const header = user && { "x-auth-token": user.data.token };
      const res = await createOrder({ body: orderDetails, headers: header });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
    Swal.fire({
      title: " Thankyou!",
      text: "Your flight has been booked",
      icon: "success",
      showConfirmButton: false,
      timer: 4000,
    }).then(() => navigate(`/`));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setCost(offer_id)
      .then(
        (data) => setOffer(data),
        (rej) => {
          throw new Error(rej);
        }
      )
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => console.log(orderDetails), [orderDetails]);

  useEffect(() => {
    console.log(paymentObj);
    console.log(offer);
    if (!isEmpty(offer)) {
      setBase(parseFloat(offer.base_amount));
      setTax(parseFloat(offer.tax_amount));
      setMarkup(parseFloat(amount) - (base + tax));
      setAmountPayable(offer.total_amount);

      let departingCity = offer.slices[0].origin.city_name;
      axios
        .get(
          `https://restcountries.com/v3.1/alpha/${offer.slices[0].origin.iata_country_code}?fields=name`
        )
        .then((res) => {
          const departingCountry = res.data.name.common;
          departingCity += ", " + departingCountry;
          setDepartingAddress(departingCity);
        });

      let arrivingCity = offer.slices.at(-1).destination.city_name;
      axios
        .get(
          `https://restcountries.com/v3.1/alpha/${
            offer.slices.at(-1).destination.iata_country_code
          }?fields=name`
        )
        .then((res) => {
          const arrivingCountry = res.data.name.common;
          arrivingCity += ", " + arrivingCountry;
          setArrivingAddress(arrivingCity);
        });
    }
  }, [offer]);

  useEffect(() => {
    if (!isEmpty(offer)) {
      setBase(convert(offer.base_amount));
      setTax(convert(offer.tax_amount));
      setMarkup(convert(parseFloat(amount) - (base + tax)));
    }
  }, [currency]);

  return (
    <>
      <div className="my-10 mx-3 md:mx-8 flex">
        <a
          className="text-blue-600 hover:text-blue-500 active:text-blue-300 flex items-center gap-1 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <MdKeyboardArrowLeft />
          Back
        </a>
      </div>
      {offerLoading ? (
        <div className="flex justify-center my-20">
          <CircularProgress />
        </div>
      ) : (
        <>
          {!isEmpty(offer) ? (
            <div className="flex flex-col mb-20">
              <div className="text-xl md:text-3xl font-normal mx-6 md:mx-14">
                Your trip from {departingAddress} to {arrivingAddress}
              </div>
              <div className="flex flex-col-reverse md:flex-row m-4 md:m-10 gap-10">
                <div className="flex flex-col flex-grow gap-10">
                  <ShowFlights resBox={offer} showPrice={false} />
                  <PassengerInformation
                    offer_id={offer_id}
                    amount={amountPayable}
                    onSubmit={(orderDetails) => {
                      setOrderDetails(orderDetails);
                    }}
                  />
                  <div>
                    <div className="uppercase primary-500 font-semibold pb-3">
                      Travel Insurance
                    </div>
                    <SideBox
                      className="text-center"
                      style={{ borderTop: "3px solid var(--primary-500)" }}
                    >
                      -- Insurance options will be displayed here once your
                      personal information is filled out --
                    </SideBox>
                  </div>
                  <div>
                    <div className="uppercase primary-500 font-semibold pb-3">
                      baggage tracking
                    </div>
                    <SideBox
                      className="text-center"
                      style={{ borderTop: "3px solid var(--primary-500)" }}
                    >
                      <div className="flex flex-col md:flex-row md:gap-10 md:items-center">
                        <div className="py-4">
                          <img
                            src="https://www.flighthub.com/images/upsell/jf-bag-assist-logo.png"
                            alt=""
                            className="object-contain"
                            style={{ height: "3rem" }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="uppercase primary-500 font-semibold mb-5 text-left">
                            DID YOU KNOW: 20 MILLION BAGS ARE MISHANDLED BY
                            AIRLINES EVERY YEAR!
                          </div>
                          <div className="flex items-baseline text-left gap-2">
                            <FaCheck />
                            BagAssist gives you additional protection against
                            lost or delayed baggage
                          </div>
                          <div className="flex items-baseline text-left gap-2">
                            <FaCheck />
                            BagAssist will locate your belongings and track
                            their return to you
                          </div>
                          <div className="flex items-baseline text-left gap-2">
                            <FaCheck />
                            We will pay you $1,000 per bag, up to two bags, if
                            your bags are not returned to you within 96 hours
                          </div>
                        </div>
                      </div>
                    </SideBox>
                  </div>
                  <div
                    className="border rounded-2xl flex flex-col md:flex-row md:justify-between md:items-center py-2 px-3"
                    style={{ background: "var(--light-green)" }}
                  >
                    <div className="flex flex-col">
                      <div className="font-bold text-base flex flex-row gap-2 items-center">
                        <span>
                          <FaLock />
                        </span>
                        SAFE & SECURE BILLING
                      </div>
                      <div className="text-sm font-medium">
                        Your credit card information is protected by a Secure
                        SSL Encrypted Transaction
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      <div className="p-2">
                        <img
                          src="https://www.flighthub.com/images/checkout-b-norton.png"
                          alt=""
                          className="object-contain"
                          style={{ width: "7rem" }}
                        />
                      </div>
                      <div
                        className="vl"
                        style={{ borderColor: "rgb(171 171 171 / 86%)" }}
                      ></div>
                      <div className="p-2">
                        <img
                          src="https://www.flighthub.com/images/icon-cc-flag-ax.svg"
                          alt=""
                          className="object-contain"
                          style={{ width: "3rem" }}
                        />
                      </div>
                      <div className="p-2">
                        <img
                          src="https://www.flighthub.com/images/icon-cc-flag-ca.svg"
                          alt=""
                          className="object-contain"
                          style={{ width: "3rem" }}
                        />
                      </div>
                      <div className="p-2">
                        <img
                          src="https://www.flighthub.com/images/icon-cc-flag-vi.svg"
                          alt=""
                          className="object-contain"
                          style={{ width: "3rem" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-4 border rounded-2xl p-4">
                      <div className="flex flex-row justify-between">
                        <div className="heading">Base Amount: </div>
                        <div className="display-cost">
                          {convert(base, offer?.base_currency).toFixed(2)}{" "}
                          <span className="text-sm primary-500">
                            {" "}
                            ({curr}){" "}
                          </span>
                        </div>
                      </div>
                      {/* <div className="flex flex-row justify-between">
                        <div className="heading">Tax: </div>
                        <div className="display-cost">
                          {convert(tax).toFixed(2)}{" "}
                          <span className="text-sm primary-500">
                            {" "}
                            ({curr}){" "}
                          </span>
                        </div>
                      </div> */}
                      <div className="flex flex-row justify-between">
                        <div className="heading">Tax & Fee: </div>
                        <div className="display-cost">
                          {convert(
                            parseFloat(amount) - base,
                            offer?.base_currency
                          ).toFixed(2)}{" "}
                          <span className="text-sm primary-500">
                            {" "}
                            ({curr}){" "}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between border-t-2 pt-2 font-medium">
                        <div className="heading">Total: </div>
                        <div className="display-cost">
                          {convert(amount, offer?.base_currency).toFixed(2)}{" "}
                          <span className="text-sm primary-500">
                            {" "}
                            ({curr}){" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-2xl p-7 ">
                    <Form className="flex flex-col gap-3 mb-4">
                      <div className="flex flex-row gap-3 flex-wrap">
                        <Form.Item
                          label="Address"
                          layout="vertical"
                          className="flex-grow-[2]"
                        >
                          <Form.Item noStyle>
                            <Input />
                          </Form.Item>
                        </Form.Item>
                        <Form.Item
                          label="Suite #"
                          layout="vertical"
                          className="flex-grow-[1]"
                        >
                          <Form.Item noStyle>
                            <Input />
                          </Form.Item>
                        </Form.Item>
                        <Form.Item
                          label="City"
                          layout="vertical"
                          className="flex-grow-[2]"
                        >
                          <Form.Item noStyle>
                            <Input />
                          </Form.Item>
                        </Form.Item>
                      </div>
                      <div className="flex flex-row gap-3 flex-wrap">
                        <Form.Item
                          label="Country"
                          layout="vertical"
                          className="flex-grow-[2]"
                        >
                          <Form.Item noStyle>
                            <Input />
                          </Form.Item>
                        </Form.Item>
                        <Form.Item
                          label="Region"
                          layout="vertical"
                          className="flex-grow-[2]"
                        >
                          <Form.Item noStyle>
                            <Input />
                          </Form.Item>
                        </Form.Item>
                        <Form.Item
                          label="Zipcode"
                          layout="vertical"
                          className="flex-grow-[1]"
                        >
                          <Form.Item noStyle>
                            <Input />
                          </Form.Item>
                        </Form.Item>
                      </div>
                      <Form.Item
                        label="Billing Phone number"
                        layout="vertical"
                        className="flex-grow-[2]"
                      >
                        <Form.Item noStyle>
                          <Input type="number" />
                        </Form.Item>
                      </Form.Item>
                      <div
                        className="mt-4 rounded-2xl border p-4 flex flex-col"
                        style={{ background: "var(--green-blue)" }}
                      >
                        <div className="text-sm font-semibold flex flex-row items-center gap-1">
                          <span>
                            <IoMailOutline />
                          </span>
                          Where should we send your ticket?
                        </div>
                        <div className="flex flex-row gap-3 flex-wrap">
                          <Form.Item
                            label="Email Address"
                            layout="vertical"
                            className="flex-grow-[2]"
                          >
                            <Form.Item noStyle>
                              <Input type="email" />
                            </Form.Item>
                          </Form.Item>
                          <Form.Item
                            label="Email Address"
                            layout="vertical"
                            className="flex-grow-[2]"
                          >
                            <Form.Item noStyle>
                              <Input type="email" />
                            </Form.Item>
                          </Form.Item>
                        </div>
                        <div className="mt-4">
                          <Checkbox>
                            Please send me travel deals and special offers
                          </Checkbox>
                        </div>
                      </div>
                    </Form>
                    {/* </div>
                  <div className="flex flex-col md:mx-auto w-full md:max-w-full border p-4 rounded-2xl"> */}
                    <DuffelPayments
                      paymentIntentClientToken={client_token}
                      onSuccessfulPayment={confirmPayment}
                      onFailedPayment={console.log}
                    />
                  </div>
                  {/* </AccordionDetails>
                  </Accordion> */}
                </div>
                <div className="flex flex-row flex-wrap md:flex-col md:flex-nowrap md:w-3/12 gap-5 md:gap-8">
                  <SideBox>
                    <div className="primary-500 font-medium">
                      Important Flight Information
                    </div>
                    <hr />
                    <div className="font-thin text-base">
                      Tickets are refundable with a penalty fee. Tickets are
                      non-transferable and name changes are not allowed. Taxes
                      and fees are included in the total ticket cost.
                    </div>
                  </SideBox>
                  <SideBox>
                    <div className="font-bold">Need Help?</div>
                    <hr />
                    <div className="font-thin text-base">
                      Our team of professional travel experts are ready to help!
                      Call us and we'll help you plan the perfect vacation for
                      you and your family.
                    </div>
                  </SideBox>
                  <SideBox>
                    <div className="font-bold">Secure SSL Booking</div>
                    <hr />
                    <div className="font-thin text-base">
                      Your personal information is encrypted and secure.
                    </div>
                  </SideBox>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="text-center text-4xl font-medium content-center align-middle"
              style={{ minHeight: "70vh" }}
            >
              Sorry, the offer has Expired
              <br />
              <Button
                className="font-medium text-base"
                type="link"
                htmlType="button"
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
