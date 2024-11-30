import { Duffel } from "@duffel/api";
import Hotel from "../models/Hotel.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import hotelTemplate from "../Utilis/hotelTemplate.js";

const duffel = new Duffel({
  token: process.env.DUFFLE_SECRET,
});

const searchLocation = async (req, res) => {
  const { hotel } = req.body;
  console.log({ ...hotel });
  try {
    const response = await duffel.stays.search({
      // rooms: 1,
      // location: {
      //     radius: 2,
      //     geographic_coordinates: {
      //         longitude: 67.0207055,
      //         latitude: 24.8546842
      //     }
      // },
      // check_out_date: "2024-12-07",
      // check_in_date: "2024-12-04",
      // guests: [{ type: "adult" }, { type: "adult" }]
      ...hotel,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

const searchHotel = async (req, res) => {
  const { hotel } = req.body;
  try {
    const response = await duffel.stays.search({
      // "accommodation": {
      //     "ids": ["acc_0000AWr2VsUNIF1Vl91xg0"],
      //     "fetch_rates": true
      // },
      // "check_out_date": "2024-08-07",
      // "check_in_date": "2024-08-04",
      // "guests": [{ "type": "adult" }, { "type": "adult" }],
      // "rooms": 1
      ...hotel,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

const roomRates = async (req, res) => {
  const { search_id } = req.body;
  try {
    const response = await duffel.stays.searchResults.fetchAllRates(search_id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

const createQuote = async (req, res) => {
  const { rate_id } = req.body;
  try {
    const response = await duffel.stays.quotes.create(rate_id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

const hotelPlaces = async (req, res) => {
  const { city } = req.body;
  console.log(city);
  console.log(req.body);
  try {
    const cities = await duffel.suggestions.list({
      name: city,
    });
    return res.status(200).json(cities?.data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const hotelPaymentIntent = async (req, res) => {
  const converter = {
    EUR: 0.840336,
    USD: 0.775194,
    CAD: 0.561798,
    GBP: 1,
  }
  const { quote } = req.body;
  try {
    const currency = quote?.total_currency;
    const payment = quote?.total_amount;
    const fxRate = converter[currency];
    const fxMarkup = 1.02;
    const duffleRate = 0.029;
    // const response = await Markup.find({});
    const markup = 5; // This is the percentage
    const dufflePayment = parseFloat(payment);
    const pay = (
      ((dufflePayment + (dufflePayment * markup) / 100) * fxRate * fxMarkup) /
      1 -
      duffleRate
    ).toFixed(2);
    console.log(pay);
    try {
      const payments = await duffel.paymentIntents.create({
        currency: "GBP",
        amount: `${pay}`,
      });
      return res.status(200).json(payments);
    } catch (error) {
      console.log("Error to Final Payment");
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log("Error to fetch offer");
    return res.status(400).json(error);
  }
}

const createBooking = async (req, res) => {
  const {
    stay_special_requests,
    quote_id,
    phone_number,
    guests,
    email,
    accommodation_special_requests,
    someData,
  } = req.body;
  console.log(req.body);
  try {
    const token = req.header("x-auth-token");
    if (token) {
      const decoded = jwt.verify(token, process.env.JWTSECRET);
      const { id } = decoded.user;
      const user = await User.findOne({ _id: id });
      if (user) {
        // const ordId = offerRequest?.data?.id;
        try {
          const order = new Order({
            orderId: "0923x214def92abc921056197",
            userId: id,
            orderData: someData,
            orderType: "hotel",
          });
          await order.save();
        } catch (error) {
          console.log("Error to save record");
        }
      }
    } else {
      try {
        const guest = new Hotel({
          name: `${guests[0]?.given_name} ${guests[0]?.family_name}`,
          email: email,
          phone: phone_number,
          hotelData: someData,
        });
        await guest.save();
        console.log("Guess Record Successfully Stored");
      } catch (error) {
        console.log(error);
      }
    }

    // Mail Sending
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kickart11@gmail.com",
        pass: "iccj tbvg xzlg xckt",
      },
    });

    const mailOptions = {
      from: "kickart11@gmail.com",
      // to: `awaiszubair512@gmail.com`,
      to: `${email}`,
      subject: "Booking Confirmation",
      html: hotelTemplate(
        `${guests[0]?.given_name} ${guests[0]?.family_name}`,
        someData?.check_in_date,
        someData?.check_out_date,
        someData?.accommodation.name,
        // someData?.image
      ),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error: ", error);
      }
    });
    const data = await duffel.stays.bookings.create({
      stay_special_requests,
      quote_id,
      phone_number,
      guests,
      email,
      accommodation_special_requests,
    });
    return res.status(200).json(data?.data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export {
  searchLocation,
  searchHotel,
  roomRates,
  createQuote,
  hotelPlaces,
  createBooking,
  hotelPaymentIntent
};
