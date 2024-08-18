import mongoose from "mongoose";

const markupSchema = mongoose.Schema({
    markup: String,
    default:0,
})


export default mongoose.model('markup',markupSchema);