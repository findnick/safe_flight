import express from 'express'
const routes = express.Router();

import { listOffers, getOffer, payment, payment_confirm, order, listOrder, cities } from '../Controllres/flights.js'



// 1
routes.post('/', listOffers);
routes.post('/getOffer', getOffer)

// 2
routes.post('/payment', payment)

// 3
routes.post('/confirm', payment_confirm);

// 4
routes.post('/order', order)
routes.post('/listOrder', listOrder)
routes.post('/cities', cities);


// module.exports = routes

export default routes
