import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  types: [String],
  hp: String,
  images: String,
}, { timestamps: true });

const Card = mongoose.model("Card", cardSchema);
export default Card;
