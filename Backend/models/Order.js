// const mongoose = require('mongoose');
import mongoose from "mongoose";
const { Schema } = mongoose;

const order = mongoose.Schema({
  userId: {
    type: Schema.ObjectId,
    ref: "user",
  },
  orderId: {
    type: String,
    required: true,
  },
  orderData: {
    type: Object,
  },
  orderType: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("order", order);
