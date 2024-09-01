import { configureStore } from '@reduxjs/toolkit';
import hotelReducer from "./slices/hotelSlice";

export default configureStore({
    reducer: {
        hotel: hotelReducer
    },
})