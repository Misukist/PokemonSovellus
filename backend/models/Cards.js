import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cardId: String,
  name: String,
  imageUrl: String,
  types: [String],
  hp: String,
  evolvesFrom: String,
  artist: String
});

export default mongoose.model("Cards", cardSchema);
