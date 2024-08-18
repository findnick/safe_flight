import { Duffel } from '@duffel/api';
import axios from 'axios';

const duffel = new Duffel({
    token: "duffel_test_nDU7qNaJM4o5KhtbvyYXl26mKJGOELJkk3Cgjy2hkqh"
})

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
            ...hotel
        })
        return res.status(200).json(response)
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
}

const searchHotel = async (req, res) => {
    const { hotel } = req.body
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
            ...hotel
        })
        return res.status(200).json(response)
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
}

const roomRates = async (req, res) => {
    const { search_id } = req.body;
    try {
        const response = await duffel.stays.searchResults.fetchAllRates(search_id)
        return res.status(200).json(response)
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
}

const createQuote = async (req, res) => {
    const { rate_id } = req.body
    try {
        const response = await duffel.stays.quotes.create(rate_id)
        return res.status(200).json(response)
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
}



export { searchLocation, searchHotel, roomRates, createQuote }