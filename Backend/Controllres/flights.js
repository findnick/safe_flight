import { Duffel } from "@duffel/api";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Guest from "../models/Guest.js";
import Markup from "../models/Markup.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import emailTemplate from "../Utilis/emailTemplate.js";

const duffel = new Duffel({
  token: process.env.DUFFLE_SECRET,
});

const listOffers = async (req, res) => {
  const { slices, passengers, cabin_class } = req.body;
  try {
    const offerRequest = await duffel.offerRequests.create({
      // "slices": [
      //     {
      //         "origin": `${origin}`,
      //         "destination": `${destination}`,
      //         "departure_date": "2024-12-19T19:35:37.538Z"
      //     },
      // ],
      // "passengers": [{ "type": `${type}` }],
      // "cabin_class": null
      slices,
      passengers,
      cabin_class,
    });
    console.log(offerRequest?.data.offers[0]);
    if (offerRequest?.data) {
      offerRequest.data.offers = offerRequest.data.offers.filter(
        (offer) => offer.owner.iata_code !== "ZZ"
      );
      const fxRate = 1;
      const fxMarkup = 1.02;
      const duffleRate = 0.029;
      const response = await Markup.find({});
      const markup = parseFloat(response[0].markup);
      offerRequest.data.offers = offerRequest.data.offers.map((offer) => {
        const paymentAmount = offer.total_amount;
        const dufflePayment = parseFloat(paymentAmount);
        const pay = (
          ((dufflePayment + (dufflePayment * markup) / 100) * fxRate * fxMarkup) /
          1 -
          duffleRate
        ).toFixed(2);
        offer.markup_amount = pay;
        return offer;
      })
    }

    return res.status(200).json(offerRequest?.data);
  } catch (error) {
    console.log(error);
    console.log(slices, passengers, cabin_class);
    console.log(req.body);
    return res.status(400).json(error);
  }
};

const getOffer = async (req, res) => {
  const { offerId } = req.body;
  try {
    const offerRequest = await duffel.offers.get(`${offerId}`);
    console.log(offerRequest?.data);
    return res.status(200).json(offerRequest?.data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const payment = async (req, res) => {
  const { offerId, currency } = req.body;
  try {
    const offer = await duffel.offers.get(offerId);
    const payment = offer?.data?.total_amount;
    const fxRate = 1;
    const fxMarkup = 1.02;
    const duffleRate = 0.029;
    const response = await Markup.find({});
    const markup = parseFloat(response[0].markup);
    const dufflePayment = parseFloat(payment);
    const pay = (
      ((dufflePayment + (dufflePayment * markup) / 100) * fxRate * fxMarkup) /
      1 -
      duffleRate
    ).toFixed(2);
    console.log(pay);
    try {
      const payments = await duffel.paymentIntents.create({
        currency: `${currency}`,
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
};

const payment_confirm = async (req, res) => {
  const { id } = req.body;
  try {
    const payment = await duffel.paymentIntents.confirm(id);
    console.log(payment);
    return res.status(200).json({ payment, offerId: id });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const order = async (req, res) => {
  const { payment, passenger, offerId, metadata, offer_data } = req.body;
  console.log("--PrintedOfferData--: ", offer_data);
  console.log(
    "---------------------------------METADATA---------------------------------"
  );
  console.log("Metadata: ", metadata);
  const someData = {
    departureTime: offer_data?.slices[0]?.segments[0]?.departing_at,
    arrivalTime: offer_data?.slices.at(-1)?.segments.at(-1)?.arriving_at,
    flightName: offer_data?.owner?.name,
    image: offer_data?.owner?.logo_symbol_url,
    destinationCity: offer_data?.slices.at(-1)?.destination?.city_name,
    originCity: offer_data?.slices[0]?.origin?.city_name,
    destinationIataCode: offer_data?.slices.at(-1)?.destination?.iata_city_code,
    originIataCode: offer_data?.slices[0]?.origin?.iata_city_code,
  };
  console.log(someData);
  try {
    const reqData = {
      type: "instant",
      payments: [
        {
          type: "balance",
          currency: `${payment?.currency}`,
          amount: `${payment?.amount}`,
        },
      ],
      selected_offers: [offerId],
      metadata: { pit: metadata },
      passengers: [
        // {
        //     phone_number: `${passenger?.phone_number}`,
        //     email: `${passenger?.email}`,
        //     born_on: "1980-07-24",
        //     title: "mr",
        //     gender: "m",
        //     family_name: `${passenger?.family_name}`,
        //     given_name: `${passenger?.given_name}`,
        //     id: passenger?.id

        // }
        ...passenger,
      ],
    };
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
            orderType: "flight",
          });
          await order.save();
          console.log("User Record Successfully Stored");
        } catch (error) {
          console.log("Error to save record. ", error);
        }
      }
    } else {
      try {
        const guest = new Guest({
          name: `${passenger[0]?.given_name} ${passenger[0]?.family_name}`,
          email: passenger[0]?.email,
          phone: passenger[0]?.phone_number,
          flightData: someData,
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
    console.log("Image: ", someData?.image);
    const mailOptions = {
      from: "kickart11@gmail.com",
      // to: `awaiszubair512@gmail.com`,
      to: `${passenger[0].email}`,
      subject: "Booking Confirmation",
      html: emailTemplate(
        `${passenger[0]?.given_name} ${passenger[0]?.family_name}`,
        someData?.departureTime,
        someData.arrivalTime,
        someData?.flightName,
        someData?.image
      ),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error: ", error);
      }
    });
    const offerRequest = await duffel.orders.create(reqData);
    console.log(offerRequest?.data);
    return res.status(200).json(offerRequest?.data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  } finally {
    // console.log(reqData);
  }
};

// -----------List Order------------------------------

const listOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await duffel.orders.get(`${orderId}`);
    console.log(order);
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const cities = async (req, res) => {
  const { city } = req.body;
  console.log(city);
  console.log(req.body);
  try {
    const cities = await duffel.suggestions.list({
      name: city,
    });
    if (cities?.data) {
      console.log(cities?.data);
      const new_city = cities.data.filter((dt) => dt?.type == "airport");
      console.log(new_city);
      return res.status(200).json(new_city);
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export {
  listOffers,
  getOffer,
  payment,
  payment_confirm,
  order,
  listOrder,
  cities,
};
