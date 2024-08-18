import { Duffel } from '@duffel/api';
import Order from '../models/Order.js'
import User from '../models/User.js';
import Guest from '../models/Guest.js'
import Markup from '../models/Markup.js';
import jwt from 'jsonwebtoken'
import { response } from 'express';

const duffel = new Duffel({
    token: "duffel_test_Eldk1ddsQj9nufWz8vYHfk-KfLh4jWvunNxjPx_aJdx"
})

const listOffers = async (req, res) => {
    // const { origin, destination, type } = req.body;
    const { slices, passengers, cabin_class } = req.body
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
        })
        console.log(offerRequest?.data);
        console.log(slices, passengers, cabin_class);
        console.log(req.body);
        return res.status(200).json(offerRequest?.data)
    } catch (error) {
        console.log(error);
        console.log(slices, passengers, cabin_class);
        console.log(req.body);
        return res.status(400).json({ error: error.message })
    }

}

const getOffer = async (req, res) => {
    const { offerId } = req.body;
    try {
        const offerRequest = await duffel.offers.get(`${offerId}`)
        console.log(offerRequest?.data);
        return res.status(200).json(offerRequest?.data)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message })
    }
}

const payment = async (req, res) => {
    const { offerId, currency } = req.body
    try {
        const offer = await duffel.offers.get(offerId);
        const payment = offer?.data?.total_amount;
        // const pay = parseFloat(payment) + 32;
        const fxRate = 1;
        const fxMarkup = 1.02;
        const duffleRate = 0.029;
        const response = await Markup.find({});
        const markup = parseFloat(response[0].markup);
        const dufflePayment = parseFloat(payment);
        const pay = (((dufflePayment + markup) * fxRate * fxMarkup) / 1-duffleRate).toFixed(2);
        // const pay = (parseFloat(payment) + 32).toFixed(2)
        console.log(pay);
        try {
            const payments = await duffel.paymentIntents.create({
                "currency": `${currency}`,
                "amount": `${pay}`
            })
            return res.status(200).json(payments)
        } catch (error) {
            console.log("Error to Final Payment");
            return res.status(400).json(error)
        }
    } catch (error) {
        console.log("Error to fetch offer");
        return res.status(400).json(error)
    }

}

const payment_confirm = async (req, res) => {
    const { id } = req.body;
    try {
        const payment = await duffel.paymentIntents.confirm(id)
        console.log(payment);
        return res.status(200).json({ payment, offerId: id })
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}

const order = async (req, res) => {
    const { payment, passenger, offerId } = req.body
    console.log("Payment: ", payment)
    console.log("Passenger: ", passenger);
    console.log("OfferID: ", offerId);
    try {
        const offerRequest = await duffel.orders.create({
            type: "instant",
            payments: [
                {
                    "type": "balance",
                    "currency": `${payment?.currency}`,
                    "amount": `${payment?.amount}`
                }
            ],
            selected_offers: [offerId],
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
                passenger
            ]
        })
        const token = req.header('x-auth-token');
        if (token) {
            const decoded = jwt.verify(token, process.env.JWTSECRET);
            const { id } = decoded.user
            const user = await User.findOne({ _id: id });
            if (user) {
                const ordId = offerRequest?.data?.id
                console.log("Data: ", offerRequest?.data);
                console.log("OfferID: ", offerRequest?.data?.id);
                console.log("OfferID: ", ordId);
                try {
                    const order = new Order({ orderId: ordId })
                    await order.save();
                } catch (error) {
                    console.log("Error to save record");
                    return res.status(400).json(error)
                }
            }
        }
        else {
            try {
                new Guest({ name: passenger?.name, email: passenger?.email, phone: passenger?.phone })
                await Guest.save();
                console.log('Guess Record Successfully Stored');
            } catch (error) {
                console.log(error);
            }
        }
        console.log(offerRequest?.data);
        return res.status(200).json(offerRequest?.data)

    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}

const listOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await duffel.orders.get(`${orderId}`);
        console.log(order);
        return res.status(200).json(order)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}

const cities = async (req, res) => {
    const { city } = req.body;
    console.log(city);
    console.log(req.body);
    try {
        const cities = await duffel.suggestions.list({
            "name": city,
        })
        if (cities?.data) {
            console.log(cities?.data);
            const new_city = cities.data.filter((dt) => dt?.type == 'airport');
            console.log(new_city);
            return res.status(200).json(new_city);
        } else {
            return res.status(200).json([]);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}

export { listOffers, getOffer, payment, payment_confirm, order, listOrder, cities };